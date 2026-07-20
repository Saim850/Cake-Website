from django.db import models
from django.contrib.auth.models import AbstractUser
from user.manager import CustomUserManager
from ecommarce_app.models import Upazila, District

class User(AbstractUser):
    username = None

    full_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11) 
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'  # Use email instead of username
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Contact(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(max_length=11)
    message = models.TextField()