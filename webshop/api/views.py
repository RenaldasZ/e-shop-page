from django.utils.translation import gettext_lazy as _
from rest_framework.views import APIView, Response
from allauth.account import app_settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialConnectView
from api.rest.serializers import RegisterSerializer

from dj_rest_auth.views import (
    LoginView, 
    LogoutView, 
    PasswordChangeView, 
    PasswordResetConfirmView,
    PasswordResetView, 
    UserDetailsView,
)
from dj_rest_auth.registration.views import (
    RegisterView,
    VerifyEmailView
)
from rest_framework import status, permissions

class GoogleConnect(SocialConnectView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "postmessage"
    client_class = OAuth2Client
    permission_classes = (permissions.AllowAny,)

    def get_response(self):
        response = super().get_response()
        response.data = {
            "user": {
                'pk': self.user.id, 
                'username': self.user.username, 
                'email': self.user.email, 
                'first_name': self.user.first_name, 
                'last_name': self.user.last_name,
                'user_has_usable_password': self.user.has_usable_password(), 
            }
        }

        response.status_code = status.HTTP_200_OK
        return response

class LoginView(LoginView):
    def get_response(self):
        response = super().get_response()
        response.data.clear()
        response.data = {
            "user": {
                'pk': self.user.id, 
                'username': self.user.username, 
                'email': self.user.email, 
                'first_name': self.user.first_name, 
                'last_name': self.user.last_name,
                'user_has_usable_password': self.user.has_usable_password()
            }
        }
        response.status_code = status.HTTP_200_OK
        return response

class RegisterView(RegisterView):
    serializer_class = RegisterSerializer

class ConfirmEmailView(APIView):
    permission_classes = [permissions.AllowAny] 

    def get(*args, **kwargs):
        return Response({'details': 'ok'})
