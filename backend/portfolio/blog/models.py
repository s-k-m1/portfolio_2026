from django.db import models

from portfolio.validators import image_validators


class BlogTag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=[
        ("News", "News"),
        ("Tutorial", "Tutorial"),
        ("Case Study", "Case Study"),
    ])
    content = models.TextField()
    image = models.ImageField(upload_to="blog/", blank=True, null=True, validators=image_validators)
    image_url = models.URLField(blank=True, default="")
    video_url = models.URLField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class BlogPostTag(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="tags")
    tag = models.ForeignKey(BlogTag, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("post", "tag")
