from django.contrib import admin
from .models import Collection, Static, CustomUser

# Register your models here.
class CollectionAdmin(admin.ModelAdmin):
    list_display=("name","insights")
    prepopulated_fields={"slug":("name",)}

admin.site.register(Collection, CollectionAdmin)
admin.site.register(Static)
admin.site.register(CustomUser)
