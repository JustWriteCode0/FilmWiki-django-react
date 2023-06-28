from django.db import models
from rest_framework import serializers
from django.utils.text import slugify


class FilmCategories(models.Model):
    category_name = models.CharField(max_length=150)
    
    def __str__(self):
        return self.category_name
    
    class Meta:
        db_table = "film_categories"
        verbose_name_plural = "Film categories"
    

class Actor(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    photo = models.ImageField()
    date_of_birth = models.DateField()

    class Meta:
        db_table = "actors"


class Film(models.Model):
    film_name = models.CharField(max_length=150)
    slug_film_name = models.SlugField(max_length=150, unique=True, blank=True)
    author = models.CharField(max_length=150)
    actors = models.ForeignKey(Actor, on_delete=models.CASCADE)
    describe = models.TextField(null=True, blank=True)
    box_office = models.IntegerField()
    star_raiting = models.IntegerField(null=True, blank=True)
    category = models.ForeignKey(FilmCategories, on_delete=models.CASCADE)

    def __str__(self):
        return self.film_name   
    
    def create(self, validated_data):
        validated_data['category']
    
    def save(self, *args, **kwargs):
        self.slug_film_name = slugify(self.film_name)
        super(Film, self).save(*args, **kwargs)

    class Meta:
        db_table = "films"


class FilmImage(models.Model):
    film = models.ForeignKey(Film, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField()

    class Meta:
        db_table = "film_images"
    
