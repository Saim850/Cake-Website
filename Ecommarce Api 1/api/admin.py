from django.contrib import admin
from ecommarce_app import models as m
from django.contrib.auth import get_user_model

User = get_user_model()

admin.site.register(m.District)
admin.site.register(m.Upazila)
admin.site.register(m.Product)
admin.site.register(m.ProductCategory)
admin.site.register(User)
