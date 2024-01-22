from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout
from api.rest.renderers import UserJSONRenderer
from api.rest.serializers import CurrentUserSerializer, MyTokenObtainPairSerializer, RegistrationSerializer #LoginSerializer,
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView

#from rest_framework_simplejwt.authentication import JWTAuthentication

#from django.conf import settings
#from datetime import datetime, timedelta

#import jwt

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user = User.objects.get(username=request.data['username'])
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = {
                'refresh': serializer.validated_data['refresh'],
                'access': serializer.validated_data['access'],
                'message': 'Login successful',
                'user_id': user.id,
                'email': user.email,
                'username': user.username,
            }
        return Response(response, status=status.HTTP_200_OK)

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)  # Delete the authentication token
        return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)

class registerAPIView(APIView):
    permission_classes = [permissions.AllowAny, ]
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request: Request) -> Response:
        """Return user response after a successful registration."""
        user_request = request.data.get()
        serializer = self.serializer_class(data=user_request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# class LoginView(APIView):
#     serializer_class = LoginSerializer
#     permission_classes = [permissions.AllowAny,]
#     renderer_classes = [UserJSONRenderer,]

#     def post(self, request: Request) -> Response:
#         """Return user after login."""
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data

#             response = {
#                 'message': 'Login successful',
#                 'user_id': user.id,
#                 'email': user.email,
#                 'username': user.username,
#             }
#             #RefreshToken.for_user(user)
#         if not serializer.is_valid():
#             print(serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response(response, status=status.HTTP_200_OK)