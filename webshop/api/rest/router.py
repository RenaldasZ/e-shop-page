from rest_framework import routers
from api.rest.viewset import UserViewSet, CustomerViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'customers', CustomerViewSet)