from rest_framework import serializers
from .models import CategoryFilm, Film


class CategoryFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryFilm
        fields = ['id', 'category_name']


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id', 'film_name', 'author', 'describe', 'star_raiting', 'box_office', 'category']
