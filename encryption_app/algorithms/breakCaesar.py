import os
import json
from collections import Counter
from encryption_app.algorithms.CaesarCipher import alphabetInfo, CaesarCipher_decoder
from django.conf import settings


BASE_DIR = settings.BASE_DIR


def read_monogram_frequencies_file(alphabet):
    monogram_frequencies = None
    url_monogram_frequencies = os.path.join(BASE_DIR, "encryption_app", "algorithms", "monogram frequencies", alphabet, "frequencies.txt")

    try:
        with open(url_monogram_frequencies, "r", encoding="UTF-8", ) as monogram_frequencies_file:
            monogram_frequencies = {
                letter: float(frequency.replace(',', '.'))
                for line in monogram_frequencies_file
                for letter, frequency in [line.split()]
            }
    except OSError:
        print("Could not open/read the file")
    except Exception as e:
        print(e)

    return monogram_frequencies


def get_fitness_of_plaintext(encrypted_text, monogram_frequencies):
    x = 0.0
    text_length = len(encrypted_text)
    letter_count = Counter(encrypted_text)

    for letter, averageFrequency in monogram_frequencies.items():
        expectedFrequency = averageFrequency / 100 * text_length
        observedFrequency = letter_count[letter]

        if expectedFrequency > 0:
            x += (observedFrequency - expectedFrequency)**2 / expectedFrequency
    
    return x


def analyze_caesar(encrypted_text, alphabet):
    monogram_frequencies = read_monogram_frequencies_file(alphabet.strip())
    alphabet_info = alphabetInfo(alphabet)
    alphabet_size = alphabet_info["alphabet_size"]

    cryptanalysis = {
        "key": [],
        "decrypted_text": [],
        "x2": [],
    }

    minX = float('inf')
    best_key = 0

    for key in range(alphabet_size):
        decrypted_message = CaesarCipher_decoder(encrypted_text, key, alphabet_info)
        x2 = get_fitness_of_plaintext(decrypted_message, monogram_frequencies)

        cryptanalysis["key"].append(key)
        cryptanalysis["decrypted_text"].append(decrypted_message)
        cryptanalysis["x2"].append(x2)

        if x2 < minX:
            minX = x2
            best_key = key

    return {
        "monogram_frequencies": json.dumps(monogram_frequencies),
        "cryptanalysis": json.dumps(cryptanalysis),
        "break_caesar": {
            "best_key": best_key,
            "decrypted_message_by_best_key": CaesarCipher_decoder(encrypted_text, best_key, alphabet_info),
        },
    }
