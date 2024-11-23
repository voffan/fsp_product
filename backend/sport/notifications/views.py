from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.status import HTTP_200_OK


# Create your views here.
class NotificationView(ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get(self, request):
        queryset = Notification.objects.filter(user__id=request.user.id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=HTTP_200_OK)