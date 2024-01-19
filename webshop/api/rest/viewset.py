from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.rest.serializers import UserSerializer, CustomerSerializer, LoginSerializer
from api.models import Customer

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # Perform any additional actions or return response as needed
            return Response({'message': 'Login successful', 'user_id': user.id, 'username': user.username})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)