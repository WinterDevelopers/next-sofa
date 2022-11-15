from django.urls import path

from . import views
app_name = 'company'

urlpatterns = [
    path('base', views.base, name='base'),
    path('', views.index, name='home'),
    path('collection/<slug:slug>', views.collection, name='collection'),
    path('sign-up', views.createUser, name='sign-up'),
    path('login', views.login, name='login'),
]