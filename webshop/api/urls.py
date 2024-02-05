from django.urls import path, include
from api.rest.router import router
from api.views import (
    FacebookConnect, 
    TwitterConnect,
    GithubConnect,
    GoogleConnect,
    LoginView
)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('auth/', include('dj_rest_auth.urls')),
    #  # URLs that do not require a session or valid token
    # path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    # path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    # # URLs that require a user to be logged in with a valid session / token.
    # path('logout/', LogoutView.as_view(), name='rest_logout'),
    # path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    # path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('auth/facebook/connect/', FacebookConnect.as_view(), name='fb_connect'),
    # path('auth/twitter/connect/', TwitterConnect.as_view(), name='twitter_connect'),
    # path('auth/github/connect/', GithubConnect.as_view(), name='github_connect'),
    path('auth/google/connect/', GoogleConnect.as_view(), name='google_connect'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]