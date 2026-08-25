from rest_framework import viewsets
from rest_framework import viewsets, generics
from portfolio.cache_mixin import SimpleCacheResponseMixin
from portfolio.permissions import IsAdminOrReadOnly

from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(SimpleCacheResponseMixin, viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]


class SkillDetailView(generics.RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]