from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=[
        ("Development", "Development"),
        ("Consulting", "Consulting"),
        ("Management", "Management"),
        ("Training", "Training"),
        ("Design", "Design"),
    ])
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
