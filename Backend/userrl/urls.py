from django.urls import path,include
from .views import MyObtainTokenPairView,setRequestUsername,uc,Logout,Hw
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('login', MyObtainTokenPairView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('set', setRequestUsername.as_view(), name='set'),
    path('register', uc.as_view(), name='register'),
    path('logout', Logout().as_view(), name='logout'),
    path('hw', Hw().as_view(), name='Hw')
]