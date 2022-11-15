from django.shortcuts import render
from django.shortcuts import get_object_or_404
from next_sofa import settings

from company.views import collection

from.models import Product,Order,OrderItem

import json
# Create your views here.
def cart(request):
    template_name = 'cart.html'
    return render(request, template_name)

def product(request,slug):
    my_product = get_object_or_404(Product, slug=slug)
    other_product = Product.objects.filter(collection=my_product.collection).exclude(id=my_product.id)
    print(other_product)
    context = {'product':my_product, 'others':other_product}
    template_name = 'product.html'
    return render(request, template_name, context)

def delivery(request):
    pub_key = settings.PAYSTACK_PUBLIC_KEY
 
    if str(request.user) == 'AnonymousUser':
        cart = {'total-cost':0, 'total-items':0}
        guest = json.loads(request.COOKIES.get('next-sofa'))
        for i in guest:
            product = Product.objects.get(id=i)
            cart['total-cost'] += product.price * guest[i]['quantity']
            cart['total-items'] += guest[i]['quantity']

    else:
        cart, created = Order.objects.get_or_create(user="winter", completed=False)
        #cart_item = OrderItem.objects.filter(order=my_order)

    context = {'pub_key':pub_key, 'cart':cart}
    template_name = 'delivery.html'
    return render(request, template_name, context)

def search(request):
    template_name = 'search.html'
    return render(request,template_name)