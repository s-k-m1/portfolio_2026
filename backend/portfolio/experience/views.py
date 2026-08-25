from rest_framework import viewsets
from rest_framework import viewsets, generics, status
from portfolio.cache_mixin import SimpleCacheResponseMixin
from rest_framework.permissions import IsAuthenticated
from portfolio.permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceViewSet(SimpleCacheResponseMixin, viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]


class ExperienceDetailView(generics.RetrieveAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]
