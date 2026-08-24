from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("projects", views.ProjectViewSet)
router.register("project-reviews", views.ProjectReviewAdminViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "projects/<int:project_id>/reviews/",
        views.PublicProjectReviewListCreateView.as_view(),
        name="project-reviews-public",
    ),
]
