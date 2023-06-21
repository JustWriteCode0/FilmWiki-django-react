from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name,  password=None, avatar=None,  **extra_fields):
        if not first_name:
            raise ValueError("User must have first name")
        if not last_name:
            raise ValueError("Users must have last name")
        if not email:
            raise ValueError("Users must have email")
        
        user=self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            **extra_fields
        )
        user.set_password(password)
        if avatar:
            user.avatar = avatar
        print(user, 'dd ' , password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, first_name, last_name, password=None, avatar=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")
        return self.create_user(email, first_name, last_name, password, avatar, **extra_fields)