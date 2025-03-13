import { validatorData } from "./dataValidator_utils.js";

function encrypt() {
    const messageInput = document.getElementById('messageInput');
    const keyInput = document.getElementById('keyInput');
    const alphabetItems = document.querySelectorAll('.alphabet-item');
    var alphabetName = null;

    const encryptedMessageOutput = document.getElementById('encryptedMessageOutput');
    const decryptedMessageOutput = document.getElementById('decryptedMessageOutput');

    alphabetItems.forEach(item => {
        if (item.classList.contains('selected')) {
            alphabetName = item.dataset.method;
        }
    })

    const message = messageInput.value;
    const key = keyInput.value;

    if (validatorData(message, key)) {
        fetchEncryptedMessage(message, key, alphabetName, encryptedMessageOutput, decryptedMessageOutput);
    } else {
        console.log("Validator: error!")
    }
}

async function fetchEncryptedMessage(message, key, alphabetName, encryptedMessageOutput, decryptedMessageOutput) {
    try {
        const response = await fetch('/encrypt/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                key: key,
                alphabet: alphabetName,
            })
        });

        if (!response.ok) { // Если HTTP-апрос находится в статусе не находящийся в диапозоне 200-299
            console.log(`HTTP error! status: ${response.status}`);
            // Если получен 404 или 500. Можно прикрутить вызав спец страницы (встроенной или кастомной)
            return;
        }

        const data = await response.json();
        encryptedMessageOutput.textContent = data.encrypted_message;
        decryptedMessageOutput.textContent = data.decrypted_message;
    } catch (error) { 
        console.error('Error when sending data to the server:', error);
    }
}

export function initCeasarCipher() {
    const encryptButton = document.getElementById('encrypt-button');

    if (encryptButton) {
        encryptButton.addEventListener('click', function (event) {
            event.preventDefault();
            encrypt();
        });
    } else {
        console.error('encrypt-button not found');
    }
}