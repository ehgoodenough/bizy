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

def get_user_avatar(backend, details, response, social_user, uid,\
                    user, *args, **kwargs):
    url = None
    if backend.__class__ == FacebookBackend:
        url = "http://graph.facebook.com/%s/picture?type=large" % response['id']
 
    elif backend.__class__ == TwitterBackend:
        url = response.get('profile_image_url', '').replace('_normal', '')
 
    if url:
        profile = user.get_profile()
        avatar = urlopen(url).read()
        fout = open(filepath, "wb") #filepath is where to save the image
        fout.write(avatar)
        fout.close()
        profile.photo = url_to_image # depends on where you saved it
        profile.save()
