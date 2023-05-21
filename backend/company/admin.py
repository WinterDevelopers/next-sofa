from django.contrib import admin
from .models import Collection, Static, CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

# Register your models here.
class CollectionAdmin(admin.ModelAdmin):
    list_display=("name","insights")
    prepopulated_fields={"slug":("name",)}

admin.site.register(Collection, CollectionAdmin)
admin.site.register(Static)

class CustomerUserAdmin(BaseUserAdmin):
    #form = UserChangeForm
    fieldsets = (
        (None, {'fields': ('email', 'password', )}),

        (_('Personal info'), {'fields': ('first_name', 'last_name')}),

        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser','groups', 'user_permissions')}),

        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        
        (_('user_info'), {'fields': ('username','email_verification','address','city','state')}),
        )
                
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ['email', 'first_name', 'last_name', 'email_verification','state']
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', )

admin.site.register(CustomUser, CustomerUserAdmin)
