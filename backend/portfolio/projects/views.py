from rest_framework import viewsets
from rest_framework import viewsets, generics, status
from portfolio.cache_mixin import SimpleCacheResponseMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from portfolio.permissions import IsAdminOrReadOnly
from .models import Project, ProjectReview
from .serializers import (
    ProjectSerializer,
    ProjectReviewPublicSerializer,
    ProjectReviewCreateSerializer,
    ProjectReviewAdminSerializer,
)


class ProjectViewSet(SimpleCacheResponseMixin, viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]


class PublicProjectReviewListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        return ProjectReview.objects.filter(
            project_id=self.kwargs["project_id"], approved=True
        )

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProjectReviewCreateSerializer
        return ProjectReviewPublicSerializer

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs["project_id"], approved=False)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"detail": "Review submitted and pending approval."},
            status=status.HTTP_201_CREATED,
        )


class ProjectReviewAdminViewSet(SimpleCacheResponseMixin, viewsets.ModelViewSet):
    queryset = ProjectReview.objects.all()
    serializer_class = ProjectReviewAdminSerializer
    permission_classes = [IsAdminOrReadOnly]
