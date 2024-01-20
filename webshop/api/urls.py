from django.urls import path, include
from api.rest.router import router
from api.views import LoginView, LogoutView, CurrentUserView

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]