from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Subscription
from .serializers import SubscriptionSerializer

# Create your views here.
class SubscriptionView(ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def list(self, request, *args, **kwargs):
        queryset = Subscription.objects.filter(user__id=request.user.id)
        ser = self.get_serializer(queryset, many=True)
        return Response(ser.data, status=200)