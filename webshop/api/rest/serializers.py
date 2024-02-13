from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from api.models import Customer, Product

# Serializers define the API representation.
class RegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    
    def get_cleaned_data(self):
        cleaned_data = super().get_cleaned_data()
        cleaned_data['first_name'] = self.validated_data.get('first_name', '')
        cleaned_data['last_name'] = self.validated_data.get('last_name', '')
        return cleaned_data

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