from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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

class RegistrationSerializer(serializers.ModelSerializer[User]):
    """Serializers registration requests and creates a new user."""

    password = serializers.CharField(max_length=128, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'bio',
            'full_name',
        ]

    def validate_email(self, value: str) -> str:
        """Normalize and validate email address."""
        valid, error_text = email_is_valid(value)
        if not valid:
            raise serializers.ValidationError(error_text)
        try:
            email_name, domain_part = value.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            value = '@'.join([email_name, domain_part.lower()])
        return value

    def create(self, validated_data):  # type: ignore
        """Return user after creation."""
        user = User.objects.create_user(
            username=validated_data['username'], email=validated_data['email'], password=validated_data['password']
        )
        user.bio = validated_data.get('bio', '')
        user.full_name = validated_data.get('full_name', '')
        user.save(update_fields=['bio', 'full_name'])
        return user

class LogoutSerializer(serializers.Serializer[User]):
    refresh = serializers.CharField()

    def validate(self, attrs):  # type: ignore
        """Validate token."""
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):  # type: ignore
        """Validate save backlisted token."""

        try:
            RefreshToken(self.token).blacklist()

        except TokenError as ex:
            raise exceptions.AuthenticationFailed(ex)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['message'] = 'login succesfull'
        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        # ...

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



# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def get_tokens(self, obj):  # type: ignore
#         """Get user token."""
#         user = User.objects.get(username=obj.username)
#         return {'refresh': user.tokens['refresh'], 'access': user.tokens['access']}

#     def validate(self, data):  # type: ignore
#         """Validate and return user login."""
#         # email = data.get('email', None)
#         username = data.get('username', None)
#         password = data.get('password', None)
#         if username is None:
#             raise serializers.ValidationError('An username address is required to log in.')

#         if password is None:
#             raise serializers.ValidationError('A password is required to log in.')

#         user = authenticate(username=username, password=password)

#         if user is None:
#             raise serializers.ValidationError('A user with this email and password was not found.')

#         if not user.is_active:
#             raise serializers.ValidationError('This user is not currently activated.')

#         return user