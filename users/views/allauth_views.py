from allauth.account.views import PasswordSetView
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required

# THIS HELPS WITH REDIRECT FUCTIONALITY ADDS IT THE ORIGINAL PASSWORD_SET
# Found in: venv\Lib\site-packages\allauth\account\views.py
class CustomPasswordSetView(PasswordSetView):

    def get_success_url(self):
        return reverse_lazy("profile")

password_set = login_required(CustomPasswordSetView.as_view()) 
