from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListingViewSet
from django.urls import path
from .views import add_listing

router = DefaultRouter()
router.register(r'listings', ListingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('add_listing/', ListingViewSet.as_view({'post': 'create'}), name='add_listing'),
    path("add_listing/", add_listing, name="add_listing"),
]   