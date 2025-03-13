import io
import sys
from encryption_app.algorithms.CaesarCipher import CaesarCipher_method

TEST_UNIT = [
    {
        "id_test": 1,
        "alphabet": "russian",
        "message": "ПривеТ",
        "key": 10,
        "result": "ЩътмпЬ",
    },
    {
        "id_test": 2,
        "alphabet": "russian",
        "message": "Байлер канон Байлер канон Байлер канон",
        "key": 15,
        "result": "Рпшъфя щпьэь Рпшъфя щпьэь Рпшъфя щпьэь",
    },
    {
        "id_test": 3,
        "alphabet": "english",
        "message": "GuIoPenW",
        "key": 31,
        "result": "LzNtUjsB",
    },
    {
        "id_test": 4,
        "alphabet": "english",
        "message": "gjjhfjdhuihhjkbnm",
        "key": 4,
        "result": "knnljnhlymllnofrq",
    },
    {
        "id_test": 5,
        "alphabet": "russian",
        "message": "буря",
        "key": 3,
        "result": "дцув",
    }
]


def tests_init():
    try:
        for i in range(len(TEST_UNIT)):
            message = TEST_UNIT[i]["message"]
            key = TEST_UNIT[i]["key"]
            alphabet = TEST_UNIT[i]["alphabet"]
            correctResult = TEST_UNIT[i]["result"]

            resultCaesarCipher = CaesarCipher_method(message, key, alphabet)

            result_test_print(i, "Encrypted test",  resultCaesarCipher["encrypted_message"], correctResult)
            result_test_print(i, "Decrypted test",  resultCaesarCipher["decrypted_message"], message)
            print()
    except Exception as e:
        print(f"Error: {e}")


def result_test_print(id_test, typeMethod, getResult, correctResult):
    if getResult == correctResult:
        print(f"{typeMethod}: {id_test} - true")
    else:
        print(f"{typeMethod}: {id_test} - False")


if __name__ == "__main__":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    tests_init()
