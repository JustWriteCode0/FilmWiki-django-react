import pytest
from WebApp.models import CustomUser


@pytest.fixture()
def new_user_factory(db):
    def create_app_user(
        email: str,
        password: str = None,
        first_name: str = 'first_name',
        last_name: str = 'last_name',
        avatar: str = None,
        is_staff: str = False,
        is_active: str = True,
        is_superuser: str = False,
    ):
        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            avatar=avatar,
            is_staff=is_staff,
            is_active=is_active,
            is_superuser=is_superuser,
        )
        return user
    return create_app_user

@pytest.fixture()
def new_user(db, new_user_factory):
    return new_user_factory("testmail@gmail.com", "password", "LNX_USR")