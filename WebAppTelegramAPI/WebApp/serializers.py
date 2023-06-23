from rest_framework import serializers
from .models import CategoryFilm, Film


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id', 'film_name', 'slug_film_name',  'author', 'describe', 'star_raiting', 'box_office', 'category']


class CategoryFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryFilm
        fields = ['id', 'category_name']