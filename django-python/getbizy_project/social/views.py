from django.http import HttpResponseRedirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from django.shortcuts import render_to_response, redirect
from django.contrib.messages.api import get_messages
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404

import random

from social_auth import __version__ as version
from .forms import UserProfileForm, SimpleProfileForm
from .models import UserProfile, User



def home(request):
    """Home view, displays login mechanism"""
    if request.user.is_authenticated():
        return HttpResponseRedirect('my-profile')
    else:
        return render_to_response(
                                'splash.html',
                                {'version': version},
                                RequestContext(request)
                            )

@login_required
def my_profile(request):
    """Login complete view, displays user data"""
    profile = UserProfile.objects.filter(user=request.user)[0]
    ctx = {
        'profile_photo': profile.profile_photo,
        'description': profile.description,
        'status': profile.status,
        'statuses': profile.STATUSES,
        'user': request.user,
        'profile': profile,
        'skills': profile.skills.split(',')

    }
    return render_to_response('account.html', ctx, RequestContext(request))

@login_required
def view_user(request):
    """Login complete view, displays user data"""
    users = User.objects.exclude(pk=request.user.id)
    users = list(users)
    random.shuffle(users)
    user = users[0]
    profile = UserProfile.objects.get(user=user)
    ctx = {
        'profile_photo': profile.profile_photo,
        'description': profile.description,
        'status': profile.status,
        'statuses': profile.STATUSES,
        'user': request.user,
        'profile': profile,
        'skills': profile.skills.split(',')

    }
    return render_to_response('busy_view.html', ctx, RequestContext(request))

@login_required
def edit_profile(request):

    profile = UserProfile.objects.filter(user=request.user)[0]
    form_attrs = {
        'profile_photo': profile.profile_photo,
        'description': profile.description,
        'skills': profile.skills,
        'status': profile.status,
        'statuses': profile.STATUSES
    }
    form = SimpleProfileForm(form_attrs)

    if request.method == 'POST':
        print request.POST
        form = SimpleProfileForm(request.POST, request.FILES)
        if form.is_valid():
            
            request.user.first_name = ''
            request.user.last_name = ''
            
            full_name = form.cleaned_data['full_name']
            name_list = full_name.split(' ')
            request.user.first_name = name_list[0]

            if len(name_list) > 1:
                request.user.last_name = name_list[1]

            request.user.email = form.cleaned_data['email']
            request.user.save()

            if form.cleaned_data['profile_photo']:
                profile.profile_photo = form.cleaned_data['profile_photo']
            profile.description = form.cleaned_data['description']
            profile.skills = form.cleaned_data['skills']
            profile.status = form.cleaned_data['status']

            profile.save()
            return HttpResponseRedirect(reverse('my-profile'))

    ctx = {
        'user': request.user,
        'profile': profile,
        'form_attrs': form_attrs
    }
    return render_to_response('edit_account.html', ctx, RequestContext(request))

@login_required
def edit_account(request):

    profile = UserProfile.objects.filter(user=request.user)[0]
    form_attrs = {
        'first_name': request.user.first_name, 
        'last_name': request.user.last_name, 
        'email': request.user.email, 
        'profile_photo': profile.profile_photo,
        'description': profile.description,
        'skills': profile.skills,
    }
    form = UserProfileForm(form_attrs)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES)
        if form.is_valid():
            request.user.first_name = form.cleaned_data['first_name']
            request.user.last_name = form.cleaned_data['last_name']
            request.user.email = form.cleaned_data['email']
            request.user.save()
            
            profile.profile_photo = form.cleaned_data['profile_photo']
            profile.description = form.cleaned_data['description']
            profile.skills = form.cleaned_data['skills']

            profile.save()

    ctx = {
        'form': form
    }
    return render_to_response('edit_account.html', ctx, RequestContext(request))

def logout(request):
    """Logs out user"""
    auth_logout(request)
    return HttpResponseRedirect('/')


def form(request):
    if request.method == 'POST' and request.POST.get('username'):
        request.session['saved_username'] = request.POST['username']
        backend = request.session['partial_pipeline']['backend']
        return redirect('socialauth_complete', backend=backend)
    return render_to_response('form.html', {}, RequestContext(request))


def form2(request):
    if request.method == 'POST' and request.POST.get('first_name'):
        request.session['saved_first_name'] = request.POST['first_name']
        backend = request.session['partial_pipeline']['backend']
        return redirect('socialauth_complete', backend=backend)
    return render_to_response('form2.html', {}, RequestContext(request))


def close_login_popup(request):
    return render_to_response('close_popup.html', {}, RequestContext(request))
