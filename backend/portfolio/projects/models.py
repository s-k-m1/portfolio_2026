from django.db import models

from portfolio.validators import image_validators


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
    image = models.ImageField(upload_to="projects/", blank=True, null=True, validators=image_validators)
    image_url = models.URLField(blank=True, default="")
    github = models.URLField(blank=True)
    demo = models.URLField(blank=True)
    client_name = models.CharField(max_length=120, blank=True, default="")
    client_role = models.CharField(max_length=120, blank=True, default="")
    client_review = models.TextField(blank=True, default="")
    client_rating = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text="Client rating from 1 to 5 stars."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class ProjectReview(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="reviews"
    )
    name = models.CharField(max_length=120)
    email = models.EmailField(blank=True, default="")
    rating = models.PositiveSmallIntegerField(
        help_text="Rating from 1 to 5 stars."
    )
    comment = models.TextField()
    approved = models.BooleanField(
        default=False,
        help_text="Only approved reviews are shown publicly.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Project Review"
        verbose_name_plural = "Project Reviews"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Review by {self.name} on {self.project.title}"
