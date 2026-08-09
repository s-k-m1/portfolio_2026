from rest_framework import serializers
from .models import BlogPost, BlogTag, BlogPostTag


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = "__all__"


class BlogPostTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostTag
        fields = "__all__"


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"
