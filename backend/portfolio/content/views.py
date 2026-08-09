from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import ContentBlock
from .serializers import ContentBlockSerializer


class ContentBlockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContentBlock.objects.all()
    serializer_class = ContentBlockSerializer
    permission_classes = [AllowAny]