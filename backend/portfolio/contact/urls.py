from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("contact-messages", views.ContactMessageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("contact-form/", views.ContactFormView.as_view(), name="contact-form"),
]