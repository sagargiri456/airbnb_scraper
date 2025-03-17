from rest_framework.decorators import api_view
from rest_framework.response import Response
# from listings.models import Listing
from listings.serializers import ListingSerializer

@api_view(["POST"])
def add_listing(request):
    serializer = ListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
