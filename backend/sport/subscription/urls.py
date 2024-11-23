
from django.urls import path
from .views import SubscriptionView

urlpatterns = [
    path('subscriptions/', SubscriptionView.as_view({'get': 'list'})),
    path('subscribe/', SubscriptionView.as_view({'post': 'subscribe'})),
]