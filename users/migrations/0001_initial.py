# Generated by Django 4.2.7 on 2023-11-29 11:09

from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import phonenumber_field.modelfields


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("socialaccount", "0001_initial"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("username", models.CharField(blank=True, max_length=30)),
                ("first_name", models.CharField(blank=True, max_length=30)),
                ("last_name", models.CharField(blank=True, max_length=30)),
                ("email", models.EmailField(max_length=254, unique=True)),
                (
                    "phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(
                        blank=True, max_length=128, null=True, region=None
                    ),
                ),
                (
                    "country",
                    django_countries.fields.CountryField(blank=True, max_length=2),
                ),
                (
                    "desc",
                    models.TextField(
                        default='Hey, there is a default text description about you that you can change it by clicking "Edit" or going',
                        max_length=200,
                        null=True,
                    ),
                ),
                (
                    "image",
                    models.ImageField(default="default.jpg", upload_to="profile_pics"),
                ),
                (
                    "github",
                    models.URLField(
                        blank=True,
                        default="https://www.github.com/",
                        max_length=1000,
                        null=True,
                    ),
                ),
                (
                    "facebook",
                    models.URLField(
                        blank=True,
                        default="https://www.facebook.com/",
                        max_length=1000,
                        null=True,
                    ),
                ),
                (
                    "googleplus",
                    models.URLField(
                        blank=True,
                        default="https://www.google.com/",
                        max_length=1000,
                        null=True,
                    ),
                ),
                (
                    "instagram",
                    models.URLField(
                        blank=True,
                        default="https://www.instagram.com/",
                        max_length=1000,
                        null=True,
                    ),
                ),
                (
                    "gender",
                    models.CharField(
                        blank=True,
                        choices=[("M", "Male"), ("F", "Female"), ("O", "Other")],
                        max_length=1,
                        null=True,
                    ),
                ),
                ("is_staff", models.BooleanField(default=False)),
                ("is_superuser", models.BooleanField(default=False)),
                ("is_active", models.BooleanField(default=True)),
                ("last_login", models.DateTimeField(blank=True, null=True)),
                ("date_joined", models.DateTimeField(auto_now_add=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_profiles_groups",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "social_account",
                    models.OneToOneField(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="custom_user",
                        to="socialaccount.socialaccount",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_profiles_user_permissions",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
