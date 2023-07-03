from rest_framework import serializers
from .models import FilmCategories, Film, Actor, FilmImage



class FilmImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmImage
        fields = ['id', 'film', 'image']

class FilmSerializer(serializers.ModelSerializer):
    images = FilmImageSerializer(many=True)
    class Meta:
        model = Film
        fields = ['id', 'film_name', 'film_poster', 'slug_film_name',  'author', 'actors', 'describe', 'star_raiting', 'box_office', 'category', 'images']

class FilmCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id', 'film_name', 'film_poster', 'slug_film_name']

class FilmCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmCategories
        fields = ['id', 'category_name']


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['id', 'first_name', 'last_name', 'photo', 'date_of_birth']


