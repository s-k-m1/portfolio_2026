from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated
from portfolio.permissions import IsAdminOrReadOnly
from rest_framework.response import Response
from .models import Education
from .serializers import EducationSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrReadOnly]


class EducationDetailView(generics.RetrieveAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrReadOnly]
