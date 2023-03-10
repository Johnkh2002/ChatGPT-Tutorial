from django.urls import path
from .views import *

urlpatterns = [
    path('', chat, name='chat'),
    path('ajax/', Ajax, name='ajax'),
]