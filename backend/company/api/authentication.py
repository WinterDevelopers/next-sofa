from django.http import HttpResponse

from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import RegisterSerializer, MyTokenObtainPairSerializer


import json

#Class to register new user
class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


#modifies the authentcation default Class to accept our modified serialized
class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer

   

