import pytest
from pytest_factoryboy import register
from Users.factories import UserFactory
from WebApp.factories import FilmFactory, FilmImageFactory, FilmActorsFactory


register(UserFactory)
register(FilmFactory)
register(FilmImageFactory)
register(FilmActorsFactory)