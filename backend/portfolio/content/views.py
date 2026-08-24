from rest_framework import viewsets

from portfolio.permissions import IsAdminOrReadOnly

from .models import ContentBlock
from .serializers import ContentBlockSerializer


class ContentBlockViewSet(viewsets.ModelViewSet):
    queryset = ContentBlock.objects.all()
    serializer_class = ContentBlockSerializer
    permission_classes = [IsAdminOrReadOnly]