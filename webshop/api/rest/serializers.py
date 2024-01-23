from typing import Any, Dict
from django.contrib.auth.models import User, update_last_login
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from api.models import Customer, Product

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['url', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        """
        Validate password complexity.
        """
        try:
            validate_password(value)
        except serializers.ValidationError as exc:
            raise serializers.ValidationError(str(exc))

        return value
    
    def validate_email(self, value):
        """
        Check if the email already exists in the database.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists. Please use a different email.")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Customer.objects.create(user=user).save()
        return user

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['is_staff'] = self.user.is_staff

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        return token

# Database serializers
class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Customer
        fields = ['url', 'user', 'user_username']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'url', 'name', 'description', 'price', 'pictureUrl', 'brand', 'type', 'quantityInStock', 'productSize']
