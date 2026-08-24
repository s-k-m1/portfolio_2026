from django.db import models


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("replied", "Replied"),
        ("closed", "Closed"),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="new",
        db_index=True,
    )
    read = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_status_display()}: {self.name} - {self.subject}"


class ContactReply(models.Model):
    contact = models.ForeignKey(
        ContactMessage,
        on_delete=models.CASCADE,
        related_name="replies",
    )
    message = models.TextField()
    sent_by = models.CharField(max_length=150, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact Reply"
        verbose_name_plural = "Contact Replies"
        ordering = ["created_at"]

    def __str__(self):
        return f"Reply to {self.contact_id} by {self.sent_by or 'admin'}"
