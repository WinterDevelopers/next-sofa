from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.urls import reverse
# Create your models here. 
class CustomUser(AbstractUser):
    STATUS = (('customer', 'customer'),('staff','staff'), ('admin', 'admin'))
                  
    username = models.CharField(max_length = 50, blank = True, null = True, unique = True)
    email = models.EmailField(unique=True,null = True)
    status = models.CharField(max_length=50, default='customer',choices=STATUS)
    email_verification = models.BooleanField(default=False)
    #additional fields
    address = models.CharField(max_length =50,null = True,)
    city = models.CharField(max_length = 20,null = True,)
    state = models.CharField(max_length = 15,null = True,)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name',]

    def __str__(self) -> str:
        return self.username


class Static(models.Model):
    insights = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.insights

class Collection(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(null=True)
    image = models.ImageField(upload_to='collection')
    details = models.CharField(max_length=200)
    insights = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    def imageURL(self):
        try:
            img_url = self.image.url
        except:
            img_url = 'next-sofa'
        return img_url

    def get_absolute_url(self):
        return reverse('company:category', {'slug':self.slug})
        
    def __str__(self) -> str:
        return self.name
