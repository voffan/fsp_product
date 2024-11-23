from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Subscription
from .serializers import SubscriptionSerializer
from contests.models import Contest

# Create your views here.
class SubscriptionView(ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def list(self, request, *args, **kwargs):
        queryset = Subscription.objects.filter(user__id=request.user.id)
        ser = self.get_serializer(queryset, many=True)
        return Response(ser.data, status=200)
    
#    @action(detail=True, method=['post'])
    def subscribe(self, request):
        result = {'result': False}
        print(request.data['subscribe'])
        print(isinstance(request.data['subscribe'], list))
        print(request.method)
        if request.method == 'POST':
            if 'subscribe' in request.data:
                try:
                    for contest in Contest.objects.filter(id__in=request.data['subscribe']):
                        Subscription.objects.create(user=request.user, contest=contest)
                    result['result'] = True
                except:
                    result['error'] = 'Список идентификаторов неправильно задан!'
            return Response(result, status=200)
        return Response(result, status=200)