import pytest
import pytest_django
from django.urls import resolve, reverse
from rest_framework.test import APIClient
from rest_framework import status


client = APIClient()

@pytest.mark.django_db
def test_users(user_factory):
    user = user_factory.create()
    print(user.email)
    assert True    

@pytest.mark.django_db
def test_user_creation():
    payload = dict(
        first_name="FirstName",
        last_name="LastName",
        email="testemail@gmail.com",
        password="SometestPassword123#",
    )
    response = client.post('/auth/users/', payload)
    data = response.data

    assert data["first_name"] == payload["first_name"]
    assert data["last_name"] == payload["last_name"]
    assert data["email"] == payload["email"]
    assert "password" not in data