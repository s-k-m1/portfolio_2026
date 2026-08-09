from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("blog-posts", views.BlogPostViewSet)
router.register("blog-tags", views.BlogTagViewSet)
router.register("blog-post-tags", views.BlogPostTagViewSet)

urlpatterns = [
    path("", include(router.urls)),
]