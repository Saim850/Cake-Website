import django_filters # type: ignore
import ecommarce_app.models as m

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr='gte'
    )   

    max_price = django_filters.NumberFilter(
        field_name='price',
        lookup_expr='lte'
    )
    class Meta:
        model=m.Product
        fields = ['category']