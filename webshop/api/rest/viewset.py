from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from api.rest.serializers import UserSerializer, CustomerSerializer, ProductSerializer
from api.models import Customer, Product
 
# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

