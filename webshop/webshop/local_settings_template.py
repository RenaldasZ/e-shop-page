SECRET_KEY = '$dd-8^j7v#^xyv20*-uxnid*biijooeuz#76d82d9brd6ewte^'

from django.core.management.utils import get_random_secret_key

for i in list(range(10)):
    print(get_random_secret_key())