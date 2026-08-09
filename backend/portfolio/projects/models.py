from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=[
        ("Frontend", "Frontend"),
        ("Backend", "Backend"),
        ("Full Stack", "Full Stack"),
        ("Security", "Security"),
        ("DevOps", "DevOps"),
        ("Mobile", "Mobile"),
    ])
    desc = models.TextField()
    tech = models.TextField(default="")
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    image_url = models.URLField(blank=True, default="")
    github = models.URLField(blank=True)
    demo = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
