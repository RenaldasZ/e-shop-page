import random
import string
from django.contrib.auth import get_user_model

def generate_username():
    characters = string.ascii_letters + string.digits
    username = ''.join(random.choice(characters) for _ in range(8))
    User = get_user_model()
    username_exists = User.objects.filter(username=username).exists()
    while username_exists:
        username = ''.join(random.choice(characters) for _ in range(8))
        username_exists = User.objects.filter(username=username).exists()
    
    return username