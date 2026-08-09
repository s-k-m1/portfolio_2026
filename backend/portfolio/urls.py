import os

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Admin lives at a non-default path in production (ADMIN_URL env), reducing scanner noise
_admin_path = os.environ.get("ADMIN_URL", "admin/").strip("/")

urlpatterns = [
    path(f"{_admin_path}/", admin.site.urls),
    path("api/", include("portfolio.accounts.urls")),
    path("api/", include("portfolio.projects.urls")),
    path("api/", include("portfolio.experience.urls")),
    path("api/", include("portfolio.education.urls")),
    path("api/", include("portfolio.services.urls")),
    path("api/", include("portfolio.certifications.urls")),
    path("api/", include("portfolio.skills.urls")),
    path("api/", include("portfolio.blog.urls")),
    path("api/", include("portfolio.contact.urls")),
    path("api/", include("portfolio.content.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)