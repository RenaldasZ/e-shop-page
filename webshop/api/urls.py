from django.urls import path, include
from api.rest.router import router
from api.views import registerAPIView, LogoutView, CurrentUserView, MyTokenObtainPairView #LoginView,
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView,
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),

    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

    #path('login/', LoginView.as_view(), name='login'),
    #path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', registerAPIView.as_view(), name='sign-up'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]