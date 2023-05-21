from django.urls import path

from . import views
from .api.views import (getTopProducts, CollectionPage, tokenCookie, authentication,userDetails)
from .api.authentication import RegisterUserAPIView,MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView,TokenVerifyView
app_name = 'company'

urlpatterns = [
    #path('base', views.base, name='base'),
    path('', views.index, name='home'),
    path('refresh', TokenRefreshView.as_view(),name='refresh'),
    path('auth/<slug:slug>', authentication, name='authentication'),
    path('register', RegisterUserAPIView.as_view(), name='register'),
    path('login', MyTokenObtainPairView.as_view(), name='login'),
    path('auth', TokenVerifyView.as_view(), name='token-verify'),
    path('user-details',userDetails, name='user-details'),
    path('set-cookie',tokenCookie, name="set_cookie"),
    path('collection/<slug:slug>',CollectionPage, name='collection'),
    path('top-products',getTopProducts,name='get_top_products')
]