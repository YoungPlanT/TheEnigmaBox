const KEY_MIN = 1;
const KEY_MAX = 50;
const MESSAGE_MAX_LENGTH = 1000;

var alphabetName = null;
var intKey = null;

export function validatorData(message, key) {
    if (!alphabetSelectCheck()) {
        console.log("Select the language (alphabet) for encoding!")
        return false;
    }

    if (!validateInput(message, key)) {
        return false;
    }

    if (!validateMessage(message)) {
        console.log("Error: validate message error");
        return false;
    }

    if (!validateKey(key)) {
        console.log("Error: validate key error")
        return false;
    }

    return true;
}

function validateInput(message, key) {
    if (!message.trim()) {
        console.log("Enter the text to encode!")
        return false;
    }

    if (!key.trim()) {
        console.log("Enter the encoding key!")
        return false;
    }

    return true;
}

function alphabetSelectCheck() {
    const alphabetItems = document.querySelectorAll('.alphabet-item');

    alphabetItems.forEach(item => {
        if (item.classList.contains('selected')) {
            alphabetName = item.dataset.alphabet;
        }
    })
    
    if (!alphabetName) { return false; }
    return true;
}

function validateMessage(message) {
    try {
        let regex;
        let processedMessage = message;

        if (processedMessage.length > MESSAGE_MAX_LENGTH) {
            console.log(`The message is too long. The maximum length is ${MESSAGE_MAX_LENGTH} characters.`);
            return false;
        }

        console.log(alphabetName);

        if (alphabetName === "russian") {
            processedMessage = processedMessage.replace(/[ё]/g, 'е').replace(/[Ё]/g, 'Е');
            regex = /^[А-Яа-я\s]+$/;
        } else if (alphabetName === "english") {
            regex = /^[A-Za-z\s]+$/;
        } else {
            console.error("Unknown alphabet:", alphabetName);
            return false;
        }
        
        return regex.test(processedMessage);
    } catch (error) {
        console.error("Error during message validation:", error);
        return false;
    }
}

function validateKey(key) {
    try {
        intKey = parseInt(key);

        if (isNaN(intKey) || intKey < KEY_MIN || intKey > KEY_MAX)
        {
            console.log("The number must be between 1 and 50.")
            return false;
        }
        return true;
    } catch (error) { 
        console.log("Error: String to number conversion failed!")
        return false; 
    }
}