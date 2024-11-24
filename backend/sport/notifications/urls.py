from django.urls import path
from .views import NotificationView

urlpatterns = [
    path('notifications/', NotificationView.as_view({'get': 'list'})),
    path('notifications/delete/<int:notification_id>/', NotificationView.as_view({'delete': 'delete'})),
]