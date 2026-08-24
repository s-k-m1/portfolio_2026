from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated
from portfolio.permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from .models import BlogPost, BlogTag, BlogPostTag
from .serializers import (
    BlogPostSerializer, BlogPostDetailSerializer,
    BlogTagSerializer, BlogPostTagSerializer, BlogPostListSerializer
)


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostDetailSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostListSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogPostCategoryView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostListSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogTagViewSet(viewsets.ModelViewSet):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogTagDetailView(generics.RetrieveAPIView):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer
    permission_classes = [IsAdminOrReadOnly]


class BlogPostTagViewSet(viewsets.ModelViewSet):
    queryset = BlogPostTag.objects.all()
    serializer_class = BlogPostTagSerializer
    permission_classes = [IsAdminOrReadOnly]
