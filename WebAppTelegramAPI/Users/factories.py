import factory
from faker import Faker
fake = Faker()

from .models import CustomUser


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    first_name = fake.first_name()
    last_name = fake.last_name()
    email = fake.email()
    password = fake.password()
