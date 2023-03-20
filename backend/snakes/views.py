from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Snake, Feeding, Cleaning
from .serializers import SnakeSerializer
from django.http import JsonResponse


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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_feedings(request):
    feedings = Feeding.objects.all()
    data = [{'snake_name': feeding.snake.name, 'time': feeding.time} for feeding in feedings]
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cleanings(request):
    cleanings = Cleaning.objects.all()
    data = [{'snake_name': cleaning.snake.name, 'time': cleaning.time} for cleaning in cleanings]
    return Response(data)
