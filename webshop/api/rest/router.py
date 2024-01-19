from django.contrib.auth.models import User
from rest_framework import routers, viewsets
from api.rest.viewset import UserViewSet, CustomerViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'Customers', CustomerViewSet)