import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.utils.html import escape
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle

from .models import ContactMessage
from .serializers import ContactMessageSerializer, ContactFormSerializer

logger = logging.getLogger(__name__)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ContactMessageDetailView(generics.RetrieveAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ContactFormView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"

    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save()
        self._notify_owner(message)
        return Response(
            {"detail": "Message transmitted securely."},
            status=status.HTTP_201_CREATED,
        )

    def _notify_owner(self, message):
        name = escape(message.name)
        email = escape(message.email)
        subject = escape(message.subject)
        text = escape(message.message)

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
      <tr><td style="padding-bottom:14px;line-height:1.6;">{text}</td></tr>
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
        try:
            email_message.send(fail_silently=False)
        except Exception as exc:  # delivery must never break the API
            logger.warning("Failed to email contact message: %s", exc)