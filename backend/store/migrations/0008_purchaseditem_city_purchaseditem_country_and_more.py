# Generated by Django 4.1.5 on 2023-05-15 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_purchaseditem_email_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseditem',
            name='city',
            field=models.TextField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='purchaseditem',
            name='country',
            field=models.TextField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='purchaseditem',
            name='state',
            field=models.TextField(max_length=250, null=True),
        ),
    ]
