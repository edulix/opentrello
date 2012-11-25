from django.views.generic.base import TemplateView
from django.http import Http404

from api import v1
from .models import Card

class IndexView(TemplateView):
    template_name = 'index.html'
