from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from main.models import Card

class CardResource(ModelResource):
    class Meta:
        queryset = Card.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']
