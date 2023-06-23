from django.db import models
from rest_framework import serializers
from django.utils.text import slugify


class CategoryFilm(models.Model):
    category_name = models.CharField(max_length=150)
    
    def __str__(self):
        return self.category_name

class Film(models.Model):
    film_name = models.CharField(max_length=150)
    slug_film_name = models.SlugField(max_length=150, unique=True, blank=True)
    author = models.CharField(max_length=150)
    describe = models.TextField(null=True, blank=True)
    box_office = models.IntegerField()
    star_raiting = models.IntegerField(null=True, blank=True)
    category = models.ForeignKey(CategoryFilm, on_delete=models.CASCADE)

    def __str__(self):
        return self.film_name   
    
    def create(self, validated_data):
        validated_data['category']
    
    def save(self, *args, **kwargs):
        self.slug_film_name = slugify(self.film_name)
        super(Film, self).save(*args, **kwargs)
        
