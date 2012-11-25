from django.db import models

class Card(models.Model):
    title = models.CharField(max_length=140)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
