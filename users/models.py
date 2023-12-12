from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.db.models.signals import pre_delete
from django.contrib.auth import get_user_model
from allauth.socialaccount.signals import pre_social_login,social_account_added, social_account_updated
from allauth.socialaccount.models import SocialAccount
from django.dispatch import receiver
from django.core.files import File
from urllib.request import urlopen
from io import BytesIO
from django.contrib.gis.geoip2 import GeoIP2

from PIL import Image 
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField

class UserManager(BaseUserManager):

    def _create_user(self, email, password, is_staff, is_superuser, request=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.now()
        email = self.normalize_email(email)

        # Get IP address from the request
        ip_address = None
        if request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip_address = x_forwarded_for.split(',')[0]
            else:
                ip_address = request.META.get('REMOTE_ADDR')

        # # Use GeoIP2 to get the country based on the IP address
            # country = None
            # if ip_address:
            #     g = GeoIP2()
            #     try:
            #         country = g.country(ip_address)['country_code']
            #     except:
            #         pass
        # Generate username based on email if username is empty
        username = email.split('@')[0]


        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            ip_address=ip_address,
            # country=country,
            username=username,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        # Resize the image
        img = Image.open(user.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(user.image.path)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    desc_text='Hey, there is a default text description about you that you can change it by clicking "Edit" or going'   
    
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    # social_account = models.OneToOneField(SocialAccount, null=True, blank=True, on_delete=models.CASCADE, related_name='custom_user')
    username = models.CharField(max_length=30, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(max_length=254, unique=True)
    phone_number = PhoneNumberField(null=True, blank=True)
    country= CountryField(blank=True)
    # title = models.CharField(default='This is the default, title change it in profile.', max_length=200, null=True)
    desc = models.TextField(default=desc_text, max_length=200, null=True)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    github = models.URLField(default='https://www.github.com/', max_length=1000, null=True, blank=True)
    facebook = models.URLField(default='https://www.facebook.com/', max_length=1000, null=True, blank=True)
    googleplus = models.URLField(default='https://www.google.com/', max_length=1000, null=True, blank=True)
    instagram = models.URLField(default='https://www.instagram.com/', max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)

    ip_address = models.GenericIPAddressField(default="0.0.0.0")

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    # Specify a related name for the groups field
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_profiles_groups',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )

    # Specify a related name for the user_permissions field
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_profiles_user_permissions',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    objects = UserManager()
    
    def __str__(self):
        return f'{self.email} User' #show how we want it to be displayed

    # @property
    # def has_usable_password(self):
    #     return super().has_usable_password if not self.social_account else False
        
# this acts asa signal for updating entries on the user  model from data gotten from social login
@receiver(pre_social_login, dispatch_uid='pre_social_login_signal')
@receiver(social_account_updated, dispatch_uid='social_account_updated_signal')
def populate_user_profile(sender, request, sociallogin, **kwargs):
    if sociallogin:
        # Extract the email from the social account data
        social_email = sociallogin.account.extra_data.get('email', None)
        if social_email:
            # Check if a user with this email already exists
            existing_user = User.objects.filter(email=social_email).first()
            # User with this email doesn't exists, handle accordingly
            if not existing_user:
                sociallogin.save(request)
                
    user_model = get_user_model()
    user_data = sociallogin.account.extra_data
    email = user_data['email']
    ip_address = '0.0.0.0'
    country = ''
    username = ''
    # Check if the user has an ip_address, if not set one
   
    if request:
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip_address = x_forwarded_for.split(',')[0]
        else:
            ip_address = request.META.get('REMOTE_ADDR')

    # Use GeoIP2 to get the country based on the IP address
    # Additional logic based on social account provider
    if sociallogin.account.provider == 'facebook':
        image_url = "http://graph.facebook.com/" + social_account.uid + "/picture?type=large"
        sociallogin.account.user.image.save('profile.jpg', File(urlopen(image_url)))
        sociallogin.account.user.first_name = user_data['first_name']
        sociallogin.account.user.username = user_data.get('username', '')

    elif sociallogin.account.provider == 'linkedin':
        image_url = user_data['picture-urls']['picture-url']
        sociallogin.account.user.image.save('profile.jpg', File(urlopen(image_url)))
        sociallogin.account.user.first_name = user_data['first-name']
        sociallogin.account.user.username = user_data.get('username', '')

    elif sociallogin.account.provider == 'twitter':
        image_url = user_data['profile_image_url']
        image_url = image_url.rsplit("_", 1)[0] + "." + image_url.rsplit(".", 1)[1]
        sociallogin.account.user.image.save('profile.jpg', File(urlopen(image_url)))
        sociallogin.account.user.first_name = user_data['name'].split()[0]
        sociallogin.account.user.username = user_data.get('username', '')

    elif sociallogin.account.provider == 'google':
        image_url = user_data['picture']
        image_content = urlopen(image_url).read()
        image_file = BytesIO(image_content)
        sociallogin.account.user.image.save('profile.jpg', File(image_file))
        # Split full name into first and last names
        full_name = user_data.get('name', '')
        if full_name:
            names = full_name.split()
            sociallogin.account.user.first_name = names[0] if names else ''
            sociallogin.account.user.last_name = ' '.join(names[1:]) if len(names) > 1 else ''
        else:
            sociallogin.account.user.first_name = ''
            sociallogin.account.user.last_name = ''
        sociallogin.account.user.username = user_data.get('username', '')

    elif sociallogin.account.provider == 'github':
        image_url = user_data['avatar_url']
        image_content = urlopen(image_url).read()
        image_file = BytesIO(image_content)
        sociallogin.account.user.image.save('profile.jpg', File(image_file))
        # Split full name into first and last names
        full_name = user_data.get('name', '')
        if full_name:
            names = full_name.split()
            sociallogin.account.user.first_name = names[0] if names else ''
            sociallogin.account.user.last_name = ' '.join(names[1:]) if len(names) > 1 else ''
        else:
            sociallogin.account.user.first_name = ''
            sociallogin.account.user.last_name = ''
        sociallogin.account.user.username = user_data.get('login', '')
    
    
    # Set the ip_address and country to the user
    sociallogin.account.user.ip_address = ip_address
    # sociallogin.account.user.country = country

    # Generate username based on email if username is empty
    if not sociallogin.account.user.username:
        email = user_data['email']
        sociallogin.account.user.username = email.split('@')[0]
    
    # Save the user object    
    sociallogin.account.user.save()

    # Resize the image
    img = Image.open(sociallogin.account.user.image.path)
    if img.height > 300 or img.width > 300:
        output_size = (300, 300)
        img.thumbnail(output_size)
        img.save(sociallogin.account.user.image.path)