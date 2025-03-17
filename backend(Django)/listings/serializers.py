from rest_framework import serializers
from .models import Listing, Host

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = '__all__'

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"

    class Meta:
        model = Listing
        fields = '__all__'
    
    def create(self, validated_data):
        host_data = validated_data.pop('host')
        host, created = Host.objects.get_or_create(**host_data)
        listing = Listing.objects.create(host=host, **validated_data)
        return listing