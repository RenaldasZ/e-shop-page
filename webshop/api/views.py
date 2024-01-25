from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialConnectView
from dj_rest_auth.social_serializers import TwitterConnectSerializer

from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView, UserDetailsView,
)
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from dj_rest_auth.app_settings import api_settings

class FacebookConnect(SocialConnectView):
    adapter_class = FacebookOAuth2Adapter

class TwitterConnect(SocialConnectView):
    serializer_class = TwitterConnectSerializer
    adapter_class = TwitterOAuthAdapter

class GithubConnect(SocialConnectView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = 'CALLBACK_URL_YOU_SET_ON_GITHUB'
    client_class = OAuth2Client

class LoginView(LoginView):
    def get_response(self):
        response = super().get_response()
        response.data = {
            "user": {
                'pk': self.user.id, 
                'username': self.user.username, 
                'email': self.user.email, 
                'first_name': self.user.first_name, 
                'last_name': self.user.last_name
            }
        }
        response.status_code = status.HTTP_200_OK
        return response