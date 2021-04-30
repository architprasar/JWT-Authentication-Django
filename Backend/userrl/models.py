from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
class CoUser(AbstractUser):
    Phoneno_regex = RegexValidator(regex=r'^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$', message="Please enter a valid Phone number")
    Phone_number = models.CharField(validators=[Phoneno_regex], max_length=17, blank=True)

  
