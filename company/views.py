from re import template
from django.shortcuts import render, redirect
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from  django.contrib.auth import authenticate
#second level
from .forms import CreateUserForm
from .models import Collection
from store.models import Product

# Create your views here.
def base(request):
    template_name = 'base.html'
    return render(request, template_name)

def index(request):
    collection = Collection.objects.get(id=1)
    featured_products = Product.objects.filter(top_featured=True).order_by('?')[:6]
    template_name = 'index.html'
    context={'collection':collection, 'featured_products':featured_products}
    return render(request, template_name, context)

def collection(request, slug):
    collection = Collection.objects.get(slug=slug)
    featured_products = Product.objects.filter(collection=collection)
    page = request.GET.get('page',1)
   
    pagnated_products = Paginator(featured_products,4)
    try:
        products = pagnated_products.page(page)
    except PageNotAnInteger:
        products = pagnated_products.page(1)
    except EmptyPage:
        products = pagnated_products.page(pagnated_products.num_pages)

    context = {'products':products, 'collection':collection, 'paginate':pagnated_products}
    template_name = 'collection.html'
    return render(request, template_name, context)

def createUser(request):
    forms = CreateUserForm()
    print('manny')
    if request.method == 'POST':
        print('yoooo!')
        forms = CreateUserForm(request.POST)
        if forms.is_valid():
            forms.save()
            print('user created')

    context  = {'forms':forms}
    template_name = 'register.html'
    return render(request, template_name, context)

def login(request):
    template_name = 'login.html'
    if request.method == 'POST':
        username = request.POST.get('username')
        password =  request.POST.get('password')
        user = authenticate(username=username, password=password)
        if  user is  not None:
            return redirect('company:home')
        else:
            return redirect('company:login')
    context = {}
    return render(request, template_name, context)