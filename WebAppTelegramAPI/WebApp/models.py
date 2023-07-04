from django.db import models
from rest_framework import serializers
from django.utils.text import slugify
from django.core.validators import MaxValueValidator
from Users.models import CustomUser

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

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        db_table = "actors"


class Film(models.Model):
    film_name = models.CharField(max_length=150, unique=True)
    film_poster = models.ImageField() 
    slug_film_name = models.SlugField(max_length=150, unique=True, blank=True)
    country = models.CharField(max_length=30, null=True, blank=True)
    release_date = models.DateField()
    author = models.CharField(max_length=150)
    actors = models.ManyToManyField(Actor)
    describe = models.TextField(null=True, blank=True)
    box_office = models.IntegerField()
    rating_imdb = models.PositiveIntegerField(null=True, blank=True)
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


class FilmReview(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    star_rating = models.PositiveIntegerField(validators=[MaxValueValidator(10)])
    review = models.TextField()

    def __str__(self):
        return self.star_rating

    class Meta:
        db_table = "film_reviews"

class FilmImage(models.Model):
    film = models.ForeignKey(Film, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField()

    def __str__(self):
        return f'{self.film}: {self.id}'

    class Meta:
        db_table = "film_images"
    
