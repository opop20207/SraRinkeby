import re
from django.shortcuts import render, resolve_url
from django.http import Http404, HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ReviewSerializer
from .models import Review

# Create your views here.
def home(request):
    return render(request, '../templates/home.html')

def flea(request):
    return render(request, '../templates/flea.html')


class ReviewList(APIView):
    def get(self, request):
        reviews = Review.objects.all()

        serializer = ReviewSerializer(reviews, many = True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReviewSerializer(
            data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_201_CREATED)
        return  Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)


class ReviewDetail(APIView):
    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk , format=None):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    
    def put(self, request, pk , format=None):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk , format=None):
        review = self.get_object(pk)
        review.delete()
        return Response(status = status.HTTP_201_CREATED)

def login(request):
    return render(request, '../templates/login.html')

