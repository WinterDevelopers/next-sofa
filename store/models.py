from email.policy import default
from django.utils.text import slugify
from django.db import models
from django.urls import reverse

from company.models import Collection
from .paystack import Paystack

import secrets
# Create your models here.

class Product(models.Model):
    collection = models.ForeignKey(Collection, on_delete = models.CASCADE, related_name='product_collect')
    name = models.CharField(max_length=40)
    slug = models.SlugField(null=True)
    top_featured = models.BooleanField(default=False)
    description = models.CharField(max_length=400)
    insight = models.PositiveBigIntegerField(default=0)
    price = models.BigIntegerField(default=0)
    quantity = models.IntegerField(default=0)
    image = models.ImageField(upload_to='product')

    def imageURL(self):
        try:
            img_url = self.image.url
        except:
            img_url = 'next-sofa'
        return img_url

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args,**kwargs)
        
    def get_absolute_url(self):
        return reverse('store:product', kwargs={'slug':self.slug})

    def __str__(self) -> str:
        return self.name

class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    image = models.ImageField(upload_to='product')
    alt = models.CharField(max_length=200)

    
    def __str__(self) -> str:
        return 'Image for '+str(self.product)

class Review(models.Model):
    user = models.CharField(max_length=200, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    comment = models.CharField(max_length=300)
    date = models.DateField(auto_now_add=True)


    def __str__(self) -> str:
        return self.user+' on '+ self.product

class Order(models.Model):
    user = models.CharField(max_length=30, null=True)
    completed = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    transaction_id = models.CharField(max_length=300)

    def __str__(self) -> str:
        return 'for '+self.user

    @property
    def get_total_orderitems(self):
        total = sum([qty.quantity for qty in self.orderOrderitem.all()])
        return total

    @property
    def get_total_cost(self):
        total = sum([qty.get_total for qty in self.orderOrderitem.all()])
        return total

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE, related_name="orderOrderitem")
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    quantity = models.IntegerField(default=0)

    @property
    def get_total(self):
        total = self.quantity*self.product.price
        return total

    def __str__(self) -> str:
        return str(self.order)

class DeliveryDetails(models.Model):
    user = models.CharField(max_length=30,null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.IntegerField()
    address = models.TextField(max_length =250)
    payment_status = models.BooleanField(default=False)
    reference = models.CharField(max_length=400, null=True)

    def save(self, *args, **kwargs):
        while not self.reference:
            ref = secrets.token_urlsafe(20)
            similar_ref = DeliveryDetails.objects.filter(reference=ref)
            if not similar_ref:
                self.reference = ref

        super().save(*args, **kwargs)

    def payment_amount(self, *args, **kwargs):
        return self.order.get_total_cost*100

    def verify_payment(self):
        paystack = Paystack()
        status,result = paystack.verifyPayment(self.reference)

        if status:
            print(self.order.get_total_cost, result['amount'])
            if result['amount']/100 == self.order.get_total_cost:
                self.payment_status = True
                self.save()
            if self.payment_status == True:
                return True
            return False
            
    def __str__(self) -> str:
        return 'details of '+self.user


class Purchased(models.Model):
    user = models.CharField(max_length=30, null=True, default="winter")
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    """ items = models.IntegerField()
    total = models.BigIntegerField() """
    date  = models.DateTimeField(auto_now_add=True)
    delivery_status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return 'details of '+self.user