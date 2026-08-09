from django.contrib import admin
from .models import Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "percentage", "display_order")
    list_filter = ("category",)
    ordering = ("display_order", "name")