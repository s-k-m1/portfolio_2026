import logging
import threading
from datetime import timedelta

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.utils import timezone
from django.utils.html import escape
from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from portfolio.permissions import IsAdminOrReadOnly
from portfolio.throttling import get_client_ip, XFFScopedRateThrottle

from .models import ContactMessage, ContactReply
from .serializers import (
    ContactMessageSerializer,
    ContactFormSerializer,
    ContactReplyInputSerializer,
)

logger = logging.getLogger(__name__)

DUPLICATE_WINDOW = timedelta(minutes=10)


def _safe(value: str) -> str:
    return escape(str(value or ""))


def _send_async(email_message: EmailMultiAlternatives) -> None:
    """Send an email in a daemon thread so the HTTP response stays fast.

    SMTP round-trips to Gmail can take ~1-2s each; dispatching them in the
    background keeps form submissions well under a few seconds while the
    messages are still delivered. Failures are logged, never block the request.
    """

    def _run() -> None:
        try:
            conn = get_connection(timeout=10)
            email_message.connection = conn
            email_message.send()
        except Exception as exc:  # pragma: no cover - external SMTP
            logger.warning("Async email send failed: %s", exc)

    threading.Thread(target=_run, daemon=True).start()


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=True, methods=["post"], url_path="reply")
    def reply(self, request, pk=None):
        """Admin-only: email a reply to the client and record it."""
        contact = self.get_object()
        serializer = ContactReplyInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        body = serializer.validated_data["message"].strip()
        sent_by = request.user.username if request.user.is_authenticated else ""

        html = f"""
<html><body style="font-family:Arial,sans-serif;background:#0b0e1a;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#111529;border:1px solid #2a2f4a;border-radius:14px;padding:28px;">
    <h2 style="color:#ffffff;margin:0 0 18px;">Re: {_safe(contact.subject)}</h2>
    <p style="color:#cbd5e1;font-size:14px;line-height:1.7;white-space:pre-wrap;">{_safe(body)}</p>
    <p style="color:#64748b;font-size:12px;margin-top:22px;">
      This is a reply to your earlier message. You can respond by emailing us directly.
    </p>
  </div>
</body></html>
"""
        email = EmailMultiAlternatives(
            subject=f"Re: {contact.subject}",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[contact.email],
            reply_to=[settings.CONTACT_EMAIL],
        )
        email.attach_alternative(html, "text/html")

        # Record the reply first so it's never lost, then send the email in
        # the background to keep the admin action snappy.
        ContactReply.objects.create(contact=contact, message=body, sent_by=sent_by)
        contact.status = "replied"
        contact.save(update_fields=["status", "updated_at"])
        _send_async(email)
        return Response(
            ContactMessageSerializer(contact).data, status=status.HTTP_200_OK
        )


class ContactMessageDetailView(generics.RetrieveAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminOrReadOnly]


class ContactFormView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [XFFScopedRateThrottle]
    throttle_scope = "contact"

    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # Honeypot filled -> spam bot. Pretend success, store nothing, send nothing.
        if data.pop("website", "").strip():
            return Response(
                {"detail": "Message transmitted securely."},
                status=status.HTTP_201_CREATED,
            )

        # Duplicate guard: ignore identical submissions within a short window.
        recent = timezone.now() - DUPLICATE_WINDOW
        duplicate = ContactMessage.objects.filter(
            name=data["name"],
            email=data["email"],
            subject=data["subject"],
            message=data["message"],
            created_at__gte=recent,
        ).first()
        if duplicate:
            return Response(
                {"detail": "Message transmitted securely."},
                status=status.HTTP_201_CREATED,
            )

        message = ContactMessage.objects.create(
            name=data["name"],
            email=data["email"],
            subject=data["subject"],
            message=data["message"],
            ip_address=get_client_ip(request),
        )

        try:
            self._notify_owner(message)
        except Exception as exc:  # delivery must never break the API
            logger.warning("Failed to email contact message to owner: %s", exc)

        try:
            self._confirm_to_client(message)
        except Exception as exc:  # non-fatal: inquiry is already stored
            logger.warning("Failed to send client confirmation email: %s", exc)

        return Response(
            {"detail": "Message transmitted securely."},
            status=status.HTTP_201_CREATED,
        )

    def _notify_owner(self, message):
        name = _safe(message.name)
        email = _safe(message.email)
        subject = _safe(message.subject)
        text = _safe(message.message)

        html_body = f"""
<html><body style="font-family:Arial,sans-serif;background:#0b0e1a;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#111529;border:1px solid #2a2f4a;border-radius:14px;padding:28px;">
    <h2 style="color:#ffffff;margin:0 0 18px;">New contact form message</h2>
    <table style="color:#cbd5e1;font-size:14px;">
      <tr><td style="padding:6px 0;color:#8b5cf6;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Name</td></tr>
      <tr><td style="padding-bottom:14px;">{name} &lt;{email}&gt;</td></tr>
      <tr><td style="padding:6px 0;color:#8b5cf6;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Subject</td></tr>
      <tr><td style="padding-bottom:14px;">{subject}</td></tr>
      <tr><td style="padding:6px 0;color:#8b5cf6;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Message</td></tr>
      <tr><td style="padding-bottom:14px;line-height:1.6;white-space:pre-wrap;">{text}</td></tr>
    </table>
    <p style="color:#64748b;font-size:12px;margin-top:22px;">
      Reply to this message to respond to the sender.
    </p>
  </div>
</body></html>
"""
        email_message = EmailMultiAlternatives(
            subject=f"New message: {message.subject}",
            body=(
                f"Name: {message.name} <{message.email}>\n\n"
                f"Subject: {message.subject}\n\n"
                f"{message.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_EMAIL],
            reply_to=[f"{message.name} <{message.email}>"],
        )
        email_message.attach_alternative(html_body, "text/html")
        _send_async(email_message)

    def _confirm_to_client(self, message):
        name = _safe(message.name)
        html_body = f"""
<html><body style="font-family:Arial,sans-serif;background:#0b0e1a;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#111529;border:1px solid #2a2f4a;border-radius:14px;padding:28px;">
    <h2 style="color:#ffffff;margin:0 0 16px;">Thank you, {name}!</h2>
    <p style="color:#cbd5e1;font-size:14px;line-height:1.7;">
      Your inquiry has been submitted successfully. Thank you for contacting us.
      We will review your message and get back to you soon.
    </p>
    <p style="color:#64748b;font-size:12px;margin-top:22px;">
      This is an automated confirmation — no reply is needed.
    </p>
  </div>
</body></html>
"""
        email_message = EmailMultiAlternatives(
            subject="We received your inquiry",
            body=(
                "Your inquiry has been submitted successfully. Thank you for "
                "contacting us. We will review your message and get back to you soon."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[message.email],
            reply_to=[settings.CONTACT_EMAIL],
        )
        email_message.attach_alternative(html_body, "text/html")
        _send_async(email_message)
