from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]

    def validate_email(self, value):
        return value

    def validate(self, data):
        if not data.get("name"):
            raise serializers.ValidationError({"name": "Name is required"})
        if not data.get("email"):
            raise serializers.ValidationError({"email": "Email is required"})
        if not data.get("subject"):
            raise serializers.ValidationError({"subject": "Subject is required"})
        if not data.get("message"):
            raise serializers.ValidationError({"message": "Message is required"})
        return data
