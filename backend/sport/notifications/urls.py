from django.urls import path
from .views import NotificationView, NotificationDelete

urlpatterns = [
    path('notifications/', NotificationView.as_view({'get': 'list'})),
    path('notifications/delete/<int:notification_id>/', NotificationDelete.as_view(), name='notification-delete'),
]