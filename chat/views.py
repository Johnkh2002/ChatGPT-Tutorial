from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai

def chat(request):
    chats = Chat.objects.all()
    return render(request, 'chat.html', {
        'chats': chats,
    })

@csrf_exempt
def Ajax(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest': # Check if request is Ajax

        text = request.POST.get('text')
        print(text)

        openai.api_key = "YOUR_API_KEY" # Here you have to add your api key.
        res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"{text}"}
        ]
        )

        response = res.choices[0].message["content"]
        print(response)

        chat = Chat.objects.create(
            text = text,
            gpt = response
        )

        return JsonResponse({'data': response,})
    return JsonResponse({})