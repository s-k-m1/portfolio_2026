from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

router = DefaultRouter()
router.register("profiles", views.ProfileViewSet)

urlpatterns = [
    path("auth/token/", obtain_auth_token, name="auth-token"),
    path("auth/me/", views.MeView.as_view(), name="auth-me"),
    path("auth/logout/", views.LogoutView.as_view(), name="auth-logout"),
    path("", include(router.urls)),
]
