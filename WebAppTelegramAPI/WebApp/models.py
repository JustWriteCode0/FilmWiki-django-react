from django.db import models
from rest_framework import serializers


class CategoryFilm(models.Model):
    category_name = models.CharField(max_length=150)
    
    def __str__(self):
        return self.category_name

class Film(models.Model):
    film_name = models.CharField(max_length=150)
    author = models.CharField(max_length=150)
    describe = models.TextField(null=True, blank=True)
    box_office = models.IntegerField()
    star_raiting = models.IntegerField(null=True, blank=True)
    category = models.ForeignKey(CategoryFilm, on_delete=models.CASCADE)

    def __str__(self):
        return self.film_name
    
    def create(self, validated_data):
        validated_data['category']
