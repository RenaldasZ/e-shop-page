from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView
from api.rest.serializers import MyTokenObtainPairSerializer 

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = {
                'refresh': serializer.validated_data['refresh'],
                'access': serializer.validated_data['access'],
                'message': 'Login successful',
                'user_id': serializer.validated_data['id'],
                'email': serializer.validated_data['email'],
                'username': serializer.validated_data['username'],
            }
        return Response(response, status=status.HTTP_200_OK)
