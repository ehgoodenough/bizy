# Define a custom User class to work with django-social-auth
from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):

    STATUSES = (
        ('1', 'Wants a short term fling'),
        ('2', 'Looking for a long term partner'),
        ('3', 'Already in an engagement'),
        ('4', 'Its complicated'),
        ('5', 'Open for anything ;p'),
    )
    
    user = models.OneToOneField(User)

    profile_photo = models.ImageField(upload_to='profiles', blank=True, null=True)
    zip_code = models.CharField(max_length=5, blank=True)
    description = models.CharField(max_length=256, blank=True)
    skills = models.CharField(max_length=128, blank=True)
    status = models.CharField(max_length=1, choices=STATUSES)

    @property
    def full_name(self):
        if len(self.user.get_full_name()):
            return self.user.get_full_name()
        else:
            return self.user.username

    def __unicode__(self):
        return self.full_name

def post_create_user(sender, instance, created, raw, **kwargs):
    """
    Automatically assigns an API key to a new user.
    """
    if created and not raw:
        user = instance

        (user_profile, created) = UserProfile.objects.get_or_create(
            user=user
        )

models.signals.post_save.connect(
    post_create_user,
    sender=User,
    dispatch_uid='post_create_user'
)
