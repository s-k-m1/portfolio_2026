from rest_framework import viewsets, generics, status
from portfolio.permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from .models import Certification
from .serializers import CertificationSerializer


class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsAdminOrReadOnly]


class CertificationDetailView(generics.RetrieveAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsAdminOrReadOnly]
