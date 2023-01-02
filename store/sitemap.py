from django.contrib.sitemaps import Sitemap
from .models import Product

class ProductsSitemap(Sitemap):
    changefreq = "always"
    priority = 0.6

    def items(self):
        return Product.objects.all()
