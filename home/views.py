from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, '../templates/home.html')

def flea(request):
    return render(request, '../templates/flea.html')

def login(request):
    return render(request, '../templates/login.html')