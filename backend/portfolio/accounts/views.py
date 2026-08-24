from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from portfolio.permissions import IsAdminOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    # Singleton profile: allow viewing/editing, never create/delete via API
    http_method_names = ["get", "put", "patch", "head", "options"]


class ProfileCreateView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrReadOnly]


from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth.models import User


class MeView(APIView):
    """Return the authenticated user + profile, used by the frontend dashboard."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        u = request.user
        profile = getattr(u, "profile", None)
        avatar = None
        if profile and profile.avatar:
            avatar = request.build_absolute_uri(profile.avatar.url)
        return Response(
            {
                "id": u.id,
                "username": u.username,
                "email": u.email,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "is_superuser": u.is_superuser,
                "is_staff": u.is_staff,
                "role": getattr(profile, "role", "") if profile else "",
                "avatar": avatar,
            }
        )


class LogoutView(APIView):
    """Revoke the caller's auth token."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response({"detail": "Successfully logged out."})
