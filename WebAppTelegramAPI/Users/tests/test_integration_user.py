from rest_framework.test import APIClient
from django.urls import resolve, reverse
import pytest
from Users.factories import UserFactory
from Users.models import CustomUser
from Users.serializers import EMAILS
from rest_framework import status


@pytest.mark.django_db
def test_api_registration():
    client = APIClient()
    url = reverse('user-list')
    user_data = UserFactory.build()
    payload = create_payload(user_data)
    response = client.post(url, payload, format="json")

    activation_url = "http://127.0.0.1:8000/auth/users/activation/"
    activation_data = get_activation_data(user_data)
    activation_response = activate_user(client, activation_url, activation_data) # send uid and token to obtain pair url

    api_token = token_obtain_pair(client, payload)

    assert activation_response.status_code == status.HTTP_204_NO_CONTENT
    assert api_token.status_code == status.HTTP_200_OK
    assert response.status_code == status.HTTP_201_CREATED
    assert_custom_user_count(1)
    assert_response_data(response, user_data)


def create_payload(user_data):
    return {
        'first_name': user_data.first_name,
        'last_name': user_data.last_name,
        'email': user_data.email,
        'password': user_data.password
    }


def get_activation_data(user_data):
    activation_data = EMAILS[user_data.email]
    return activation_data

def activate_user(client, activation_url, activation_data):
    act_response = client.post(activation_url, activation_data)
    print(act_response, 'ACTIVATION')
    return act_response


def token_obtain_pair(client, payload):
    # create access and refresh token
    url = reverse('token_obtain_pair')
    token_response = client.post(url, payload)
    print('TOKEN:', token_response.data)
    return token_response


def assert_custom_user_count(expected_count):
    # if the user has been created, there should be 1 object in the model
    assert CustomUser.objects.all().count() == expected_count

def assert_response_data(response, user_data):
    # the response information must match the created user
    assert response.data['first_name'] == user_data.first_name
    assert response.data['last_name'] == user_data.last_name
    assert response.data['email'] == user_data.email
    assert 'password' not in response.data