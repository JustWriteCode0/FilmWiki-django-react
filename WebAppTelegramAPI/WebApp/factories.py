import factory
from faker import Faker
fake = Faker()

from .models import Film, FilmImage, Actor, FilmCategory


class FilmImageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = FilmImage
    
    film = factory.SubFactory('WebApp.factories.FilmFactory')
    image = factory.django.ImageField(filename='image.jpg')


class FilmActorsFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Actor

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    photo = factory.django.ImageField()
    date_of_birth = factory.Faker("date_of_birth")

class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = FilmCategory
    
    category_name = factory.Faker("name")


class FilmFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Film
        skip_postgeneration_save = True
    
    film_name = factory.Faker("name")
    film_poster = factory.django.ImageField(filename='NewPoster.jpg')
    slug_film_name = factory.Faker("slug")
    country = factory.Faker("country")
    release_date = factory.Faker("date")
    author = factory.Faker("name")
    box_office = '999999'
    date_added = factory.Faker("date")

    @factory.post_generation
    def actors(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            if isinstance(extracted, Actor):
                self.actors.add(extracted)
            else:
                for actor in extracted:
                    self.actors.add(actor)
    
    @factory.post_generation
    def category(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            if isinstance(extracted, FilmCategory):
                self.category.add(extracted)
            else:
                for category in extracted:
                    self.category.add(category)

