from rest_framework import serializers
from .models import FilmCategory, Film, Actor, FilmImage, FilmReview


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
    actors_name = serializers.SerializerMethodField()

    class Meta:
        model = Film
        fields = ['id', 'film_name', 'film_poster', 'slug_film_name', 'country', 'release_date', 'author', 'actors_name',  'describe', 'rating_imdb', 'box_office', 'category', 'images']

    def get_actors_name(self, obj):
        actors = obj.actors.all()
        actor_names = [f"{actor.first_name} {actor.last_name}" for actor in actors]
        return ", ".join(actor_names)


class FilmCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id', 'film_name', 'film_poster', 'slug_film_name']


class FilmCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmCategory
        fields = ['id', 'category_name']
