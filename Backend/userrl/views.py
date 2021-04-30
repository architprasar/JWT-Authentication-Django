from .ser import MyTokenObtainPairSerializer,Use
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework_simplejwt import authentication
from rest_framework.response import Response
import jwt
from django.conf import settings
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    authentication_classes = ()
    serializer_class = MyTokenObtainPairSerializer


class setRequestUsername(APIView):

    def post(self,request):
        
        if 'HTTP_AUTHORIZATION' in request.META:
            
            token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
            data = jwt.decode(token,settings.SECRET_KEY , algorithms=["HS256"])
            request.user = data['username']
            return Response({"user":data['username']})
           
                
        return Response({"error":"No tokenfound"})

class Logout(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        if 'refresh_token' in request.data:
            try:
                refresh_token = request.data["refresh_token"]
                token = RefreshToken(refresh_token)
                request.user = None
                token.blacklist()
                return Response({"message":"loggedout"},status=status.HTTP_205_RESET_CONTENT)
            except Exception as e:
                print(e)
                return Response({"error":"error"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"message":"refresh token missing"})

class uc(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = Use(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Hw(APIView):

    def get(self, request):
        data = str(request.user)
        return Response({"name":data}, status=status.HTTP_200_OK)
