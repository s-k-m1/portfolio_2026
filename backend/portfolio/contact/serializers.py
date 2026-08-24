from rest_framework import serializers
from .models import ContactMessage, ContactReply


class ContactReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactReply
        fields = ["id", "message", "sent_by", "created_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    replies = ContactReplySerializer(many=True, read_only=True)

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "status",
            "read",
            "ip_address",
            "created_at",
            "updated_at",
            "replies",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "replies"]


class ContactFormSerializer(serializers.ModelSerializer):
    # Honeypot: real humans never fill a hidden field; bots that do are
    # silently dropped by the view (marked write_only so it never leaks).
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message", "website"]

    def validate_name(self, value):
        value = (value or "").strip()
        if not value:
            raise serializers.ValidationError("Name is required")
        if len(value) > 200:
            raise serializers.ValidationError("Name is too long")
        return value

    def validate_email(self, value):
        value = (value or "").strip()
        if not value:
            raise serializers.ValidationError("Email is required")
        return value

    def validate_subject(self, value):
        value = (value or "").strip()
        if not value:
            raise serializers.ValidationError("Subject is required")
        if len(value) > 200:
            raise serializers.ValidationError("Subject is too long")
        return value

    def validate_message(self, value):
        value = (value or "").strip()
        if not value:
            raise serializers.ValidationError("Message is required")
        if len(value) < 10:
            raise serializers.ValidationError(
                "Message is too short (minimum 10 characters)"
            )
        if len(value) > 5000:
            raise serializers.ValidationError("Message is too long")
        return value


class ContactReplyInputSerializer(serializers.Serializer):
    message = serializers.CharField(
        required=True, allow_blank=False, min_length=2, max_length=5000
    )
