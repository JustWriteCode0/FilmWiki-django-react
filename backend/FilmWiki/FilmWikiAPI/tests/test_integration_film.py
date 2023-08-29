from Users.factories import UserFactory
from FilmWikiAPI.factories import FilmFactory
from Users.serializers import EMAILS
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from Users.models import CustomUser
from FilmWikiAPI.models import FilmReview
import json


@pytest.mark.django_db
def test_api_film():
    client = APIClient()
    create_film()
    user = create_user(client)
    token = activate_user_and_get_token(user, client)
    
    film_list = get_film_list(client)
    slug_film_name = film_list.data['results'][0]['slug_film_name']
    film_response = client.get(f'http://128.0.0.1:8000/api/v1/films/{slug_film_name}/')

    review_response, review_payload = create_review_to_film(user, film_response.data, token.data, client)
    assert CustomUser.objects.all().count() == 1
    assert token.status_code == status.HTTP_200_OK
    assert_film_creating(film_response, slug_film_name, film_list)
    assert_review_creating(review_response, review_payload)


def assert_review_creating(review_response, review_payload):
    assert review_response.status_code == status.HTTP_201_CREATED
    assert FilmReview.objects.all().count() == 1
    assert review_response.data['user_id'] == review_payload['user']
    assert review_response.data['star_rating'] == review_payload['star_rating']
    assert review_response.data['review'] == review_payload['review']

def assert_film_creating(film_response, slug_film_name, film_list):
    assert film_list.status_code == status.HTTP_200_OK
    assert film_response.status_code == status.HTTP_200_OK
    assert film_response.data['slug_film_name'] == slug_film_name


def create_review_to_film(user, film, token, client):
    review_url = reverse('film-review-create', kwargs={'slug': film['slug_film_name']})
    access_token = token['access']

    review_payload = {
        'film': film['id'],
        'user': user['id'],
        'star_rating': 5,
        'review': 'TestReview',
    }

    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    review_response = client.post(review_url, review_payload, headers=headers)
    return review_response, review_payload


def get_film_list(client):
    film_url = 'http://128.0.0.1:8000/api/v1/films/'
    response = client.get(film_url)
    return response


@pytest.mark.django_db
def activate_user_and_get_token(user, client):

    activation_url = 'http://127.0.0.1:8000/auth/users/activation/'
    activation_data = EMAILS[user['email']]
    client.post(activation_url, activation_data) #activate user
    
    token_url = reverse('token_obtain_pair')
    token_response = client.post(token_url, user)
    return token_response


@pytest.mark.django_db
def create_user(client):
    url = reverse('user-list')
    user = UserFactory.build()
    payload = {
        'id': 1,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'password': user.password
    }
    response = client.post(url, payload)
    return payload


def create_film():
    film = FilmFactory.create()
    return film
