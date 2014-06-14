from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    #url(r'^$', TemplateView.as_view(template_name='base.html')),

    url(r'', include('social_auth.urls')),
    url(r'^$', 'social.views.home', name='home'),

    url(r'^my-profile/', 'social.views.my_profile', name='my-profile'),
    url(r'^edit-profile/', 'social.views.edit_profile', name='edit-profile'),
    url(r'^edit-account/', 'social.views.edit_account', name='edit-account'),
    url(r'^view-user/', 'social.views.view_user', name='view-user'),

    url(r'^logout/', 'social.views.logout', name='logout'),
    url(r'^admin/', include(admin.site.urls)),
)

# Uncomment the next line to serve media files in dev.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
                        url(r'^__debug__/', include(debug_toolbar.urls)),
                    )
