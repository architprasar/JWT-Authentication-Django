from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CoUser
from rest_framework import serializers




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)        
        token['username'] = user.username
        
        return token


class Use(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField(required=True)

    password = serializers.CharField(min_length=8, write_only=True, required=True)

    class Meta:
        model = CoUser
        fields = ('email', 'username', 'password','first_name','last_name','Phone_number')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data) 
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance
        

