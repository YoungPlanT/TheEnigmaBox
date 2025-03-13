from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .algorithms.CaesarCipher import CaesarCipher_method
from .algorithms.breakCaesar import analyze_caesar

# Create your views here.
def index(request):
    return render(request, 'encryption_app/index.html')


@csrf_exempt
def encrypted_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            message = data['message']
            key = int(data['key'])
            alphabet = data['alphabet']

            CaesarCipher_methodResult = CaesarCipher_method(message, key, alphabet)
            encrypted_message = CaesarCipher_methodResult['encrypted_message']
            decrypted_message = CaesarCipher_methodResult['decrypted_message']

            return JsonResponse(
                {
                    'encrypted_message': encrypted_message,
                    'decrypted_message': decrypted_message,
                }
            )
        except (ValueError, KeyError) as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request!'}, status=400)


@csrf_exempt
def cryptanalysis_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            message = data['message'].upper()
            alphabet = data['alphabet']

            AnalyzeCaesar_result = analyze_caesar(message, alphabet)
            monogram_frequencies = AnalyzeCaesar_result['monogram_frequencies']
            cryptanalysis = AnalyzeCaesar_result['cryptanalysis']
            breakCaesar_bestKey = AnalyzeCaesar_result['break_caesar']['best_key']
            breakCaesar_decryptedMessage = AnalyzeCaesar_result['break_caesar']['decrypted_message_by_best_key']

            return JsonResponse(
                {
                    'monogram_frequencies': monogram_frequencies,
                    'cryptanalysis': cryptanalysis,
                    'breakCaesar_bestKey': breakCaesar_bestKey,
                    'breakCaesar_decryptedMessage': breakCaesar_decryptedMessage,
                }
            )
        except (ValueError, KeyError) as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request!'}, status=400)
