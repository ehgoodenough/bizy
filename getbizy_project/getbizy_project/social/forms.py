from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from crispy_forms.layout import Layout, Field, ButtonHolder, Submit, HTML, Div

class SimpleProfileForm(forms.Form):


    profile_photo = forms.ImageField(required=False)
    description = forms.CharField(max_length=256, widget=forms.Textarea)
    skills = forms.CharField(max_length=128, widget=forms.Textarea)
    status = forms.CharField()
    email = forms.EmailField(required=True)
    full_name = forms.CharField()


class UserProfileForm(forms.Form):

    first_name = forms.CharField(
        max_length=80,
        required=True,
    )
    last_name = forms.CharField(
        max_length=80,
        required=True,
    )

    email = forms.EmailField(required=True)
    profile_photo = forms.ImageField(required=False)
    description = forms.CharField(max_length=256, widget=forms.Textarea)
    skills = forms.CharField(max_length=128, widget=forms.Textarea)
    zip_code = forms.CharField(max_length=5)

    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id-exampleForm'
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Field('first_name', label='First Name'),
            Field('last_name', label='Last Name'),
            Field('email', label='Email Address'),
            Field('profile_photo', label='Update Profile Picture'),
            Field('description', label='Short Bio', rows="3"),
            Field('skills', label='Your skills, comma delimeted', rows="3"),
            Field('zip_code', label='Zip Code')
        )

        self.helper.add_input(Submit('submit', 'Submit'))
