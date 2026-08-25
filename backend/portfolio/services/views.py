from rest_framework import viewsets
from rest_framework import viewsets, generics, status
from portfolio.cache_mixin import SimpleCacheResponseMixin
from rest_framework.permissions import IsAuthenticated
from portfolio.permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(SimpleCacheResponseMixin, viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]


class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]
