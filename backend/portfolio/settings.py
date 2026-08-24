import os
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

DEBUG = os.environ.get("DEBUG", "True").lower() == "true"

# Security: never allow an insecure default secret in production
SECRET_KEY = os.environ.get("SECRET_KEY", "")
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "dev-only-insecure-secret-key"  # nosec B105 - dev fallback only; prod requires env
    else:
        raise ImproperlyConfigured("SECRET_KEY must be set in production")

# Host validation: in production ALLOWED_HOSTS must be explicit, never '*'
_allowed = os.environ.get("ALLOWED_HOSTS", "").strip()
if not _allowed and not DEBUG:
    raise ImproperlyConfigured("ALLOWED_HOSTS must be set in production")
ALLOWED_HOSTS = [h.strip() for h in (_allowed or "*").split(",") if h.strip()]

if not DEBUG:
    # Cover platform-generated subdomains so ALLOWED_HOSTS doesn't have to list
    # each one explicitly (Railway, Google Cloud Run, Koyeb, Fly.io, Render).
    ALLOWED_HOSTS += [".railway.app", ".up.railway.app", ".run.app", ".koyeb.app", ".fly.dev", ".onrender.com"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "django_otp",
    "django_otp.plugins.otp_static",
    "django_otp.plugins.otp_totp",
    "two_factor",
    "portfolio.accounts",
    "portfolio.projects",
    "portfolio.experience",
    "portfolio.education",
    "portfolio.services",
    "portfolio.certifications",
    "portfolio.skills",
    "portfolio.blog",
    "portfolio.contact",
    "portfolio.content",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django_otp.middleware.OTPMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "portfolio.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

def _parse_database_url(url: str) -> dict:
    """Convert a postgres:// URI into Django DB settings.

    Forwards query params such as ``sslmode`` (Neon rejects non-TLS
    connections, so the URL must carry ``?sslmode=require``).
    """
    from urllib.parse import urlsplit, parse_qs

    parts = urlsplit(url)
    query = {k: v[-1] for k, v in parse_qs(parts.query).items()}
    options = {}
    sslmode = query.get("sslmode")
    if sslmode:
        options["sslmode"] = sslmode
    return {
        "NAME": parts.path.strip("/"),
        "USER": parts.username or "postgres",
        "PASSWORD": parts.password or "",
        "HOST": parts.hostname or "localhost",
        "PORT": str(parts.port or 5432),
        "OPTIONS": options,
    }


DB_ENGINE = os.environ.get("DB_ENGINE", "django.db.backends.postgresql")
_db_url = os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL", "")
_db_parsed = _parse_database_url(_db_url) if _db_url else {}

DATABASES = {
    "default": {
        "ENGINE": DB_ENGINE,
        "NAME": _db_parsed.get("NAME") or os.environ.get("DB_NAME", "portfolio_db"),
        "USER": _db_parsed.get("USER") or os.environ.get("DB_USER", "postgres"),
        "PASSWORD": _db_parsed.get("PASSWORD") or os.environ.get("DB_PASSWORD", ""),
        "HOST": _db_parsed.get("HOST") or os.environ.get("DB_HOST", "localhost"),
        "PORT": _db_parsed.get("PORT") or os.environ.get("DB_PORT", "5432"),
        "OPTIONS": _db_parsed.get("OPTIONS", {}),
    }
}

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Phone/email are kept in Profile, no auth overrides

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "portfolio.permissions.IsAdminOrReadOnly",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 100,
    # XFF-aware classes: key on the true client IP (proxy appends it), not on a
    # client-spoofable header or the shared proxy address. See throttling.py.
    "DEFAULT_THROTTLE_CLASSES": [
        "portfolio.throttling.XFFAnonRateThrottle",
        "portfolio.throttling.XFFUserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "contact": "30/hour",
        "anon": "60/min",
        "user": "600/hour",
    },
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
}

if DEBUG:
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"].append(
        "rest_framework.renderers.BrowsableAPIRenderer"
    )

# Login: two-factor authentication protects the admin; staff sign in at /account/
LOGIN_URL = "two_factor:login"
LOGIN_REDIRECT_URL = "admin:index"
TWO_FACTOR_PATCH_ADMIN = True  # default Django admin becomes OTP-required

# Rate limiting: trust X-Forwarded-For only behind exactly one trusted proxy
# (Render). DRF's default trusts the client header unconditionally, so this
# must stay off ("off") if the origin could ever be reached directly.
THROTTLE_USE_XFF = (
    os.environ.get("THROTTLE_USE_XFF", "off" if DEBUG else "on").lower()
    in {"1", "true", "on", "yes"}
)

# CORS: only explicit frontend origins, never '*'
_cors = [o.strip() for o in os.environ.get("CORS_ALLOWED_ORIGINS", "").split(",") if o.strip()]
CORS_ALLOWED_ORIGINS = _cors or [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True
# Allow any Vercel deployment (production + preview branches) without having to
# list every generated *.vercel.app hostname. Explicit production origins should
# still be set via CORS_ALLOWED_ORIGINS.
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]

# Security hardening
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
if not DEBUG:
    # Render terminates TLS at its proxy; trust the forwarded scheme
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = os.environ.get("SECURE_SSL_REDIRECT", "True").lower() == "true"
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    CSRF_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SECURE_HSTS_SECONDS = int(os.environ.get("SECURE_HSTS_SECONDS", "31536000"))
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

CSRF_TRUSTED_ORIGINS = [o for o in CORS_ALLOWED_ORIGINS]

# Email — used to forward contact-form messages to the portfolio owner
EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend")
EMAIL_HOST = os.environ.get("EMAIL_HOST", "")
EMAIL_PORT = int(os.environ.get("EMAIL_PORT", "587"))
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS", "True").lower() == "true"
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER or "contact@saroj01.com.np")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "info@saroj01.com.np")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
    },
    "root": {"handlers": ["console"], "level": "INFO"},
}