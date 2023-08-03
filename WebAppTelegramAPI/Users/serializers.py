from rest_framework import serializers
from .models import CustomUser
from WebApp.models import FilmReview



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'avatar']

        # Make the password write-only and don't include it when reading
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        avatar = validated_data.pop('avatar', None)
        user = CustomUser.objects.create(**validated_data)
        if avatar:
            user.avatar = avatar
        user.save()
        return user

    def update(self, instance, validated_data):
        avatar = validated_data.pop('avatar', None)
        instance = super().update(instance, validated_data)
        if avatar:
            instance.avatar = avatar
            instance.save()
        return instance


class ProfileReviewSerializer(serializers.ModelSerializer):
    film_name = serializers.CharField(source="film.film_name", read_only=True)

    class Meta:
        model = FilmReview
        fields = ['id', 'film', 'film_name', 'review', 'star_rating']


class UserProfileSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'avatar', 'reviews']

    def get_reviews(self, user):
        review = FilmReview.objects.filter(user=user)
        return ProfileReviewSerializer(review, many=True).data