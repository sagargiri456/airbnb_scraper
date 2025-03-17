from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Listing
from .serializers import ListingSerializer
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Listing
from .serializers import ListingSerializer

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    
    def get_queryset(self):
        queryset = Listing.objects.all()
        location = self.request.query_params.get('location')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        min_rating = self.request.query_params.get('min_rating')
        
        if location:
            queryset = queryset.filter(location__icontains=location)
        if min_price:
            queryset = queryset.filter(price_per_night__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_per_night__lte=max_price)
        if min_rating:
            queryset = queryset.filter(ratings__gte=min_rating)
            
        return queryset
    
@api_view(["POST"])
def add_listing(request):
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Listing saved successfully!"}, status=201)
        return Response(serializer.errors, status=400)
    