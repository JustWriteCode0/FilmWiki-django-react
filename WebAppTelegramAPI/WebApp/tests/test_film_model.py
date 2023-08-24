import pytest 
from WebApp.factories import FilmFactory, FilmImageFactory, FilmActorsFactory, CategoryFactory
from WebApp.models import Film


@pytest.mark.parametrize(
    "film_name, film_poster, slug_film_name, country, release_date, author, actors, describe, box_office, rating_imdb, category, date_added",
    [
        ("NewFilmName", 'NewFilmPoster.jpg', "newfilmname", "USA", "2021-12-12", "NewAuthor", None, "NewDescribe", "999999", 8, 1, "2023-12-12")
    ],
)

def test_film(db, film_name, film_poster, slug_film_name, country, release_date, author, actors, describe, box_office, rating_imdb, category, date_added):
    # Create actors using the factory
    actors = FilmActorsFactory()
    categories = CategoryFactory.create_batch(3)
    # Use the FilmFactory to create a Film instance
    film_factory_kwargs = {
        "film_name": film_name,
        "film_poster": film_poster,
        "slug_film_name": slug_film_name,
        "country": country,
        "release_date": release_date,
        "author": author,
        "actors": actors,
        "describe": describe,
        "box_office": box_office,
        "rating_imdb": rating_imdb,
        "category": categories,
        "date_added": date_added,
    }
    film_factory_kwargs['actors'] = actors
    film = FilmFactory(**film_factory_kwargs)
    # Check the count of Film objects in the database
    item_count = Film.objects.all().count()
    print(item_count)
    assert item_count == 1

    