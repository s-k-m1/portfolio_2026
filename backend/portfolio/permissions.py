"""Role-based permissions for the portfolio API.

Writes (POST/PUT/PATCH/DELETE) are restricted to staff or superusers — the
"super admins" who manage the portfolio from the custom frontend dashboard.
Reads stay public so the marketing site can render without auth.
"""
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_superuser or request.user.is_staff)
        )
