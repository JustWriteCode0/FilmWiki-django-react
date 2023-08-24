from rest_framework import serializers
from .models import CustomUser
from WebApp.models import FilmReview
from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage
from djoser import utils
from djoser.conf import settings




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
    slug_film_name = serializers.CharField(source="film.slug_film_name", read_only=True)

    class Meta:
        model = FilmReview
        fields = ['id', 'film', 'film_name', 'slug_film_name', 'review', 'star_rating']


class UserProfileSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'avatar', 'reviews']

    def get_reviews(self, user):
        review = FilmReview.objects.filter(user=user)
        return ProfileReviewSerializer(review, many=True).data

EMAILS = {}

class ActivationEmail(BaseEmailMessage):
    """Email Activation Token Generator"""
    template_name = "email/activation.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()
        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        uid, token = context['uid'], context['token']
        # here we store all the requested tokens in a dictionary for later use
        EMAILS[user.email] = {'uid': uid, 'token': token}
        return context