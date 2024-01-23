from django.urls import path, include
from api.rest.router import router
from api.views import (
    FacebookConnect, 
    TwitterConnect,
    GithubConnect
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/facebook/connect/', FacebookConnect.as_view(), name='fb_connect'),
    path('auth/twitter/connect/', TwitterConnect.as_view(), name='twitter_connect'),
    path('auth/github/connect/', GithubConnect.as_view(), name='github_connect'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]