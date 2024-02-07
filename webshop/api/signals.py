from django.db.models.signals import post_save, pre_delete, pre_save
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.http import HttpResponse
from allauth.socialaccount.models import SocialAccount
from api.models import Customer
from api.utils import generate_username
from api.views import LoginView
from django.conf import settings

@receiver(post_save, sender=get_user_model()) 
def create_profile(sender, instance, created, **kwargs):
    if created:
        Customer.objects.create(user=instance)

@receiver(pre_save, sender=get_user_model()) 
def check_username(sender, instance, **kwargs):
    username_exists = get_user_model().objects.filter(username=instance.username).exists()
    if username_exists or instance.username is "":
        instance.username = generate_username()


# @receiver(post_save, sender=SocialAccount) 
# def check_username(sender, instance, created, **kwargs):
#     if created:
#         settings.USERS_WO_PWD.add(instance.user.email)
        

# @receiver(post_save, sender=User) 
# def save_profile(sender, instance, **kwargs):
#         instance.profile.save()
