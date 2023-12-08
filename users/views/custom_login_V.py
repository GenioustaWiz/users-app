from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from allauth.account.views import LoginView
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_protect

from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.urls import reverse
from allauth.account.models import EmailConfirmation
from django.core.mail import send_mail

from users.models import User

# @csrf_protect
class CustomLoginView(LoginView):
     # Extract email from the request data
    email = request.POST.get('login')  # Assuming 'login' is the name of the email field in your form

    # Check if the email is associated with a user
    user = User.objects.filter(email=email).first()
    if user:
        # Email is associated with a social account
        if user.has_usable_password():
            def form_valid(self, form):
                print('Processing additional data for social account:', user)

                # Social account has a password, proceed with normal login
                response = super().form_valid(form)

                # Process additional data here before returning the response
                # For example, you can modify the response content

                return response
        else:
            # Social account doesn't have a password, send reset password link
            send_set_password_email(self.request, email)
            messages.success(self.request, 'Check your email for a password reset link.')
            # return render(self.request, 'account/custom/password_set_email_sent.html')  # Create this template

    # Email is not associated with a social account, proceed with normal login
    else:
        def form_valid(self, form):
            response = super().form_valid(form)

            # Process additional data here before returning the response
            # For example, you can modify the response content
            print('Processing additional data for non-social account')

            return response

login = LoginView.as_view()

def send_set_password_email(request, email):
    current_site = get_current_site(request)
    user = request.user  # Assuming the user is authenticated here
    email_confirmation = EmailConfirmation.create(user)
    email_confirmation.sent = timezone.now()
    email_confirmation.save()


    subject = 'Set a Password'
    message = render_to_string('password_set.html', {
        'user': request.user,
        'domain': current_site.domain,
        'uid': email_confirmation.key,
        'token': email_confirmation.key,
    })
    to_email = [email]
    email = EmailMessage(subject, message, to=to_email)
    email.send()