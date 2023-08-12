import pytest
import pytest_django


def test_users(new_user):
    assert new_user.first_name == "LNX_USR"    
