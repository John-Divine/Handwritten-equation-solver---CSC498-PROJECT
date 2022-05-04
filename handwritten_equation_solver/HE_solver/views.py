from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

# Create your views here.
def index(request):
    return render(request,'HE_solver/index.html')

def predict(request):
    if request.is_ajax and request.method =='POST':


