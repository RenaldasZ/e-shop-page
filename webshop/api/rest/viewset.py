from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from api.rest.serializers import UserSerializer, CustomerSerializer, ProductSerializer
from api.models import Customer, Product
from api.rest.paginator import StandardResultsSetPagination
 
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

