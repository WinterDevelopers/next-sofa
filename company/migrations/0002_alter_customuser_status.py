# Generated by Django 4.1.1 on 2023-01-27 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='status',
            field=models.CharField(choices=[('customer', 'customer'), ('staff', 'staff'), ('admin', 'admin')], default='customer', max_length=50),
        ),
    ]
