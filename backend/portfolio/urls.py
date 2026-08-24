import os

from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from two_factor.urls import urlpatterns as _two_factor_urlpatterns

# django-two-factor-auth 1.18 ships its urlpatterns as an include()-style tuple;
# unwrap the actual pattern list so the namespace/wrapping is fully explicit.
_two_factor_urlpatterns = _two_factor_urlpatterns[0]

# Admin lives at a non-default path in production (ADMIN_URL env), reducing scanner noise
_admin_path = os.environ.get("ADMIN_URL", "admin/").strip("/")

urlpatterns = [
    # Lightweight health check for platforms (e.g. Cloud Run) that probe "/"
    path("", lambda request: HttpResponse("ok", content_type="text/plain")),
    path(f"{_admin_path}/", admin.site.urls),
    # Two-factor auth landing pages (used by the OTP-protected admin login)
    path("", include((_two_factor_urlpatterns, "two_factor"))),
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