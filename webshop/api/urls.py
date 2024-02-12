from django.urls import path, include
from api.rest.router import router
from api.views import (
    GoogleConnect,
    LoginView,
    RegisterView,
)

from dj_rest_auth.registration.views import (
    VerifyEmailView,
    ResendEmailVerificationView
)

from dj_rest_auth.views import (
    PasswordResetView,
    PasswordResetConfirmView,
    LogoutView,
    UserDetailsView,
    PasswordChangeView,
)


urlpatterns = [
    path('', include(router.urls)),
     # URLs that do not require a session or valid token
    path('auth/login/', LoginView.as_view(), name='rest_login'),
    path('auth/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    # URLs that require a user to be logged in with a valid session / token.
    path('auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('auth/user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('auth/password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('auth/registration/', RegisterView.as_view(), name='rest_register'),
    path('auth/registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('auth/registration/verify-email/<key>/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('auth/registration/resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    #re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmVerifyEmailView.as_view(), name='account_confirm_email'),
    # path(
    #     'account-email-verification-sent/', TemplateView.as_view(),
    #     name='account_email_verification_sent',),
    path('auth/google/connect/', GoogleConnect.as_view(), name='google_connect'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
