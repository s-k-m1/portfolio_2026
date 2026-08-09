from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("skills", views.SkillViewSet)

urlpatterns = [
    path("", include(router.urls)),
]