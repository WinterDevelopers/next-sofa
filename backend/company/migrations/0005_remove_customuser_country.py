# Generated by Django 4.1.5 on 2023-05-18 06:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_alter_customuser_address_alter_customuser_city_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='country',
        ),
    ]
