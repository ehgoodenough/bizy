from django.contrib import admin
from social.models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    pass
admin.site.register(UserProfile, UserProfileAdmin)