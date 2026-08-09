from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from .models import BlogPost, BlogTag, BlogPostTag
from .serializers import (
    BlogPostSerializer, BlogPostDetailSerializer,
    BlogTagSerializer, BlogPostTagSerializer, BlogPostListSerializer
)


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogPostCategoryView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogTagViewSet(viewsets.ModelViewSet):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogTagDetailView(generics.RetrieveAPIView):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BlogPostTagViewSet(viewsets.ModelViewSet):
    queryset = BlogPostTag.objects.all()
    serializer_class = BlogPostTagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
