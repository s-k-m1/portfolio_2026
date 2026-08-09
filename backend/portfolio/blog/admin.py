from django.contrib import admin
from .models import BlogPost, BlogTag, BlogPostTag

admin.site.register(BlogPost)
admin.site.register(BlogTag)
admin.site.register(BlogPostTag)
