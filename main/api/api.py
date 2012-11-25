from tastypie.api import Api
from resources import CardResource

v1 = Api("v1")
v1.register(CardResource())
