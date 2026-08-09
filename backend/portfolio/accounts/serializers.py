from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    full_name = serializers.CharField(source="user.get_full_name", read_only=True)

    class Meta:
        model = Profile
        fields = [
            "id", "user", "full_name", "email", "phone", "address", "github",
            "linkedin", "portfolio_url", "portfolio_description",
            "role", "tagline", "avatar", "created_at", "updated_at"
        ]
        read_only_fields = ["user"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "password"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def validate(self, data):
        if not data.get("username"):
            raise serializers.ValidationError({"username": "Username is required"})
        if not data.get("email"):
            raise serializers.ValidationError({"email": "Email is required"})
        return data
