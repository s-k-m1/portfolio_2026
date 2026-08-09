from django.db import models


class ContentBlock(models.Model):
    key = models.SlugField(max_length=100, unique=True)
    content = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Content Block"
        verbose_name_plural = "Content Blocks"
        ordering = ["key"]

    def __str__(self):
        return self.key