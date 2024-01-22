from django.shortcuts import render
from django.contrib.auth import logout
from api.rest.serializers import LoginSerializer, CurrentUserSerializer
from api.rest.renderers import UserJSONRenderer
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request

from django.conf import settings
from datetime import datetime, timedelta

import jwt

# from webshop.local_settings import SECRET_KEY

SECRET_KEY = "TEST_KEY"

# Create your views here.
class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny,]
    renderer_classes = [UserJSONRenderer,]

    def post(self, request: Request) -> Response:
        """Return user after login."""
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data

            response = {
                'message': 'Login successful',
                'user_id': user.id,
                'email': user.email,
                'username': user.username
            }
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(response, status=status.HTTP_200_OK)
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)  # Delete the authentication token
        return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)