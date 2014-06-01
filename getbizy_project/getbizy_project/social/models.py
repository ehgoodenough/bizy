# Define a custom User class to work with django-social-auth
from django.db import models


class UserProfileManager(models.Manager):
    def create_user(self, username, email):
        return self.model._default_manager.create(username=username)


class UserProfile(models.Model):

    username = models.CharField(max_length=128)
    profile_photo = models.ImageField(upload_to='profiles', blank=True, null=True)

    last_login = models.DateTimeField(blank=True, null=True)

    objects = UserProfileManager()


    def is_authenticated(self):
        return True
