from rest_framework import serializers
from .models import Project, ProjectReview


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ProjectReviewPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectReview
        fields = ["id", "name", "rating", "comment", "created_at"]


class ProjectReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectReview
        fields = ["name", "email", "rating", "comment"]

    def validate_rating(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value


class ProjectReviewAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectReview
        fields = "__all__"
