from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=30,
        choices=[
            ("Frontend", "Frontend"),
            ("Backend", "Backend"),
            ("Tools", "Tools & Languages"),
        ],
        default="Backend",
    )
    percentage = models.PositiveIntegerField(default=60)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return f"{self.name} ({self.category})"