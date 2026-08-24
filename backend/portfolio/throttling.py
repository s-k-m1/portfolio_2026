from django.conf import settings
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle, ScopedRateThrottle


def get_client_ip(request):
    """Resolve the real client IP for rate limiting.

    DRF's default get_ident() trusts a client-supplied X-Forwarded-For header
    verbatim (concatenating it) — an attacker can rotate that header to cycle
    through throttle keys and never be rate limited. Behind exactly one trusted
    proxy (Render) the proxy overwrites X-Forwarded-For with the true peer IP,
    so the first address is the real visitor. THROTTLE_USE_XFF must only be
    enabled when the origin is exclusively reachable through such a proxy.
    """
    if settings.THROTTLE_USE_XFF:
        xff = request.META.get("HTTP_X_FORWARDED_FOR", "")
        if xff:
            client = xff.split(",")[0].strip()
            if client:
                return client
    return request.META.get("REMOTE_ADDR", "").strip()


class XFFAnonRateThrottle(AnonRateThrottle):
    def get_ident(self, request):
        return get_client_ip(request)


class XFFUserRateThrottle(UserRateThrottle):
    def get_ident(self, request):
        return get_client_ip(request)


class XFFScopedRateThrottle(ScopedRateThrottle):
    def get_ident(self, request):
        return get_client_ip(request)