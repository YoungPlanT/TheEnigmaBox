def alphabetInfo(alphabet_name):
    match alphabet_name:
        case ("russian"):
            return {
                "first_letter_LowerCase": "а",
                "first_letter_UpperCase": "А",
                "alphabet_size": 32,
            }
        case ("english"):
            return {
                "first_letter_LowerCase": "a",
                "first_letter_UpperCase": "A",
                "alphabet_size": 26,
            }
        case _:
            return None


def CaesarCipher_method(message, key, alphabet):
    alphabet_info = alphabetInfo(alphabet)

    if alphabet_info["alphabet_size"] is None:
        return {
            "encrypted_message": "Error: alphabet is not find",
            "decrypted_message": "Error: alphabet is not find",
        }
    encrypted_message = CaesarCipher_encoder(message, key, alphabet_info)
    decrypted_message = CaesarCipher_decoder(encrypted_message, key, alphabet_info)

    return {
        "encrypted_message": encrypted_message,
        "decrypted_message": decrypted_message,
    }


def CaesarCipher_encoder(message, key, alphabetInfo):
    result = ""
    alphabet_size = alphabetInfo["alphabet_size"]
    for letter in message:
        if letter.isspace():
            result += letter
            continue

        if letter.isupper():
            int_unicode_first_letter_in_alphabet = ord(alphabetInfo["first_letter_UpperCase"])
        else:
            int_unicode_first_letter_in_alphabet = ord(alphabetInfo["first_letter_LowerCase"])

        int_unicode_letter = ord(letter)
        shifted_unicode = ((int_unicode_letter - int_unicode_first_letter_in_alphabet + key) % alphabet_size)\
                          + int_unicode_first_letter_in_alphabet
        result += chr(shifted_unicode)
    return result


def CaesarCipher_decoder(message, key, alphabetInfo):
    result = ""
    alphabet_size = alphabetInfo["alphabet_size"]
    for letter in message:
        if letter.isspace():
            result += letter
            continue

        if letter.isupper():
            int_unicode_first_letter_in_alphabet = ord(alphabetInfo["first_letter_UpperCase"])
        else:
            int_unicode_first_letter_in_alphabet = ord(alphabetInfo["first_letter_LowerCase"])

        int_unicode_letter = ord(letter)
        shifted_unicode = ((int_unicode_letter - int_unicode_first_letter_in_alphabet - key) % alphabet_size) \
                          + int_unicode_first_letter_in_alphabet
        result += chr(shifted_unicode)
    return result