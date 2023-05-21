from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.password_validation import validate_password

from store.models import Product,ProductImages
from ..models import Collection,CustomUser


#to get user deatils
class serializeCustomUser(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "username"]

class serializedProducts(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class serializedCollection(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'

#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password2','email',)
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
            {"password": "Password fields didn't match."})
        return attrs
    
    """ def email_verification(self, attrs):
        
        return print('hello winter: ',attrs['email']) """

    
    """ def activateEmail(request):
        print('started')
        subject = 'welcome to GFG world'
        message = f'Hi, thank you for registering in geeksforgeeks.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['christianezekwem101@gmail.com']
        send_mail( subject, message, email_from, recipient_list )
        print('sent mail') """

    def create(self, validated_data,**kwargs):
        #self.activateEmail()
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            #first_name=validated_data['first_name'],
            #last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

#modified the jwt class(TokenObtainPairSerializer) serializer to encode our email not the name to the token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        # ...'token' this contains all the access and referesh token
        return (token)