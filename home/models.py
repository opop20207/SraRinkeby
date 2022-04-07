from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class Review(models.Model):
    title = models.CharField(max_length=50)
    conten = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)