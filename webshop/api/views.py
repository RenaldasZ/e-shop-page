from django.shortcuts import render
from django.contrib.auth import logout
from api.rest.serializers import LoginSerializer, CurrentUserSerializer
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
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
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # Perform any additional actions or return response as needed

            payload = {
                'id': user.id,
                'username': user.username,
                'email' : user.email,
                'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
            }
            jwt_token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

            response = Response({
                'message': 'Login successful',
                'user_id': user.id,
                'email': user.email,
                'username': user.username
            })

            response.set_cookie(
                key='e-shop-token',
                value=jwt_token,
                httponly=True,
                expires=datetime.utcnow() + timedelta(hours=24),
            )

            return response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)  # Delete the authentication token
        return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)