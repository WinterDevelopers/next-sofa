# Generated by Django 4.1.5 on 2023-06-04 12:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0010_alter_review_product_alter_review_rating_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='customer',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
