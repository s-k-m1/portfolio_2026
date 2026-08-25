from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response


class SimpleCacheResponseMixin:
    """Cache GET list/retrieve responses and invalidate them on writes.

    Uses a per-resource version key: any create/update/delete bumps the version,
    orphaning previously cached entries (which then expire by TTL). Works with any
    Django cache backend (Redis in production, LocMem as a safe fallback).
    """

    cache_response_timeout = int(getattr(settings, "CACHE_TTL", 300))
    cache_list = True
    cache_retrieve = True

    @property
    def _version_key(self) -> str:
        return f"api:version:{getattr(self, 'basename', self.__class__.__name__)}"

    def _version(self):
        return cache.get_or_set(self._version_key, 1, timeout=None)

    def _cache_key(self, request, suffix: str) -> str:
        return (
            f"api:v{self._version()}:{getattr(self, 'basename', self.__class__.__name__)}"
            f":{suffix}:{request.get_full_path()}"
        )

    def list(self, request, *args, **kwargs):
        if not self.cache_list:
            return super().list(request, *args, **kwargs)
        data = cache.get(self._cache_key(request, "list"))
        if data is not None:
            return Response(data)
        resp = super().list(request, *args, **kwargs)
        if resp.status_code == 200:
            cache.set(self._cache_key(request, "list"), resp.data, self.cache_response_timeout)
        return resp

    def retrieve(self, request, *args, **kwargs):
        if not self.cache_retrieve:
            return super().retrieve(request, *args, **kwargs)
        data = cache.get(self._cache_key(request, "retrieve"))
        if data is not None:
            return Response(data)
        resp = super().retrieve(request, *args, **kwargs)
        if resp.status_code == 200:
            cache.set(self._cache_key(request, "retrieve"), resp.data, self.cache_response_timeout)
        return resp

    def perform_create(self, serializer):
        super().perform_create(serializer)
        self._invalidate()

    def perform_update(self, serializer):
        super().perform_update(serializer)
        self._invalidate()

    def perform_destroy(self, instance):
        super().perform_destroy(instance)
        self._invalidate()

    def _invalidate(self):
        try:
            cache.incr(self._version_key, 1)
        except ValueError:
            cache.set(self._version_key, 2, timeout=None)
