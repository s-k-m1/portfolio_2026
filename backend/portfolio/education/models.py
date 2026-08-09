from django.db import models


class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Education"
        verbose_name_plural = "Educations"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"
