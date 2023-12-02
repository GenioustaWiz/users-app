from django.urls import path
from .views import *
from .admin_views.dashboard_home_V import *


# ++++++++++++ Ulrs for Main Admin +++++++++++++++++
urlpatterns = [
    path('', home, name='home'),
    path('main-dashboard/', main_dashboard_home, name='main_dashboard_home'),
]