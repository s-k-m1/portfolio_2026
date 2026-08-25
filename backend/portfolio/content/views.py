from rest_framework import viewsets
from portfolio.cache_mixin import SimpleCacheResponseMixin

from portfolio.permissions import IsAdminOrReadOnly

from .models import ContentBlock
from .serializers import ContentBlockSerializer


class ContentBlockViewSet(SimpleCacheResponseMixin, viewsets.ModelViewSet):
    queryset = ContentBlock.objects.all()
    serializer_class = ContentBlockSerializer
    permission_classes = [IsAdminOrReadOnly]