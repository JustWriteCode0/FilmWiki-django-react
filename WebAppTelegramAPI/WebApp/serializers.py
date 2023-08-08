from rest_framework import serializers
from .models import FilmCategories, Film, Actor, FilmImage, FilmReview


class FilmImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmImage
        fields = ['id', 'film', 'image']


class ReviewSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = FilmReview
        exclude = ['id', 'user', 'film']
        

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['id', 'first_name', 'last_name']


class FilmSerializer(serializers.ModelSerializer):
    images = FilmImageSerializer(many=True)

    class Meta:
        model = Film
        fields = ['id', 'film_name', 'film_poster', 'slug_film_name', 'country', 'release_date', 'author', 'actors', 'describe', 'rating_imdb', 'box_office', 'category', 'images']


class FilmCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id', 'film_name', 'film_poster', 'slug_film_name']


class FilmCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmCategories
        fields = ['id', 'category_name']
