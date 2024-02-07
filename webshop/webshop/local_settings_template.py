SECRET_KEY = 'q5szki5s05hn&6&n03iusbl(uk5&146bc*a4(+@8@dhh7gx&le'
GOOGLE_CLIENT_ID = ""
GOOGLE_SECRET_KEY = ""


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
DEFAULT_FROM_EMAIL = "" 

from django.core.management.utils import get_random_secret_key

for i in list(range(10)):
    print(get_random_secret_key())