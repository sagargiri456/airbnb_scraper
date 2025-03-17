from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=255)
    price_per_night = models.FloatField()
    currency = models.CharField(max_length=10)
    beds = models.CharField(max_length=50, blank=True, null=True)
    bedrooms = models.CharField(max_length=50, blank=True, null=True)
    bathrooms = models.CharField(max_length=50, blank=True, null=True)
    rating = models.CharField(max_length=10, blank=True, null=True)
    reviews = models.CharField(max_length=50, blank=True, null=True)
    host_name = models.CharField(max_length=255, blank=True, null=True)
    host_link = models.URLField(blank=True, null=True)
    url = models.URLField(unique=True)

    def __str__(self):
        return self.title
class Host(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)