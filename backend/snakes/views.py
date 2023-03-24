from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Snake, Feeding, Cleaning
from .serializers import SnakeSerializer, FeedingSerializer, CleaningSerializer
from django.http import JsonResponse, HttpResponse


@api_view(['GET'])
@permission_classes([AllowAny])
def get_snake_messages(request):
    print('get_snake_messages called')
    snakes = Snake.objects.all()
    messages = []
    for snake in snakes:
        if snake.needs_feeding():
            messages.append(f"{snake.name} is not up-to-date: feeding not marked complete")
        if snake.needs_cleaning():
            messages.append(f"{snake.name} is not up-to-date: cleaning not marked complete")
    return JsonResponse({"messages": messages})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_snakes(request):
    snakes = Snake.objects.all()
    serializer = SnakeSerializer(snakes, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_snakes(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = SnakeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        snakes = Snake.objects.filter(user_id=request.user.id)
        serializer = SnakeSerializer(snakes, many=True)
        return Response(serializer.data)
    
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_snake(request, pk):
    try:
        snake = Snake.objects.get(id=pk, user=request.user)
    except Snake.DoesNotExist:
        return Response({'error': 'Snake not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        data = request.data.copy()
        paired = data.pop('paired', None)
        if paired is not None:
            snake.paired = paired.lower() == 'true'
        serializer = SnakeSerializer(snake, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snake.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def get_feedings(request, id=None):
    print('get_feedings called')
    if id:
        try:
            feeding = Feeding.objects.get(id=id)
            if request.method == 'PUT':
                serializer = FeedingSerializer(feeding, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer = FeedingSerializer(feeding)
            return Response(serializer.data)
        except Feeding.DoesNotExist:
            return Response(status=404)
    else:
        feedings = Feeding.objects.all()
        data = []
        for feeding in feedings:
            snake_data = SnakeSerializer(feeding.snake).data
            data.append({
                'feeding': FeedingSerializer(feeding).data,
                'snake': snake_data,
            })
        return Response(data)


@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def get_cleanings(request, id=None):
    print('get_cleanings called')
    if id:
        try:
            cleaning = Cleaning.objects.get(id=id)
            if request.method == 'PUT':
                serializer = CleaningSerializer(cleaning, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer = CleaningSerializer(cleaning)
            return Response(serializer.data)
        except Cleaning.DoesNotExist:
            return Response(status=404)
    else:
        cleanings = Cleaning.objects.all()
        data = []
        for cleaning in cleanings:
            snake_data = SnakeSerializer(cleaning.snake).data
            data.append({
                'cleaning': CleaningSerializer(cleaning).data,
                'snake': snake_data,
            })
        return Response(data)
