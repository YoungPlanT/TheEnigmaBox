const config_validator = {
    KEY_MIN: 1,
    KEY_MAX: 50,
    MESSAGE_MAX_LENGTH: 1000,
}

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

export class Validator {
    constructor() {
        var alphabetName = null;
        var intKey = null;
    }

    validateData(message, key) {
        try {
            this.validateInput(message, key);
            this.alphabetSelectCheck();
            this.validateMessage();
            this.valiadateKey();

            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    validateInput(message, key) {
        if (!message.trim()) {
            throw new ValidationError("Enter the text encode!", "message");
        }

        if (!key.trim()) {
            throw new ValidationError("enter thew encoding key!", "key");
        }
    }

    alphabetSelectCheck() {
        const alphabetItems = document.querySelectorAll('.alphabet-item');
        let selectedAlphabet = null;
        
        alphabetItems.forEach(item => {
            if (item.classList.contains('selected')) {
                selectedAlphabet = item.dataset.alphabet;
            }
        });

        if (!selectedAlphabet) {
            throw new ValidationError("Select the language (alphabet) for encoding!", "alphabet");
        }

        this.alphabetName = selectedAlphabet;
    }

    validateMessage(message) {
        if (message.length < config_validator.MESSAGE_MAX_LENGTH) {
            throw new ValidationError(`The message is too long. The maximum length is ${config_validator.MESSAGE_MAX_LENGTH} characters.`, 
                "message");
        }

        let processedMessage = message;
        if (this.alphabetName == "russian") {
            processedMessage = processedMessage.replace(/[ё]/g, 'е').replace(/[Ё]/g, 'Е');
        }

        const regex = this.getAlphabetRegex(this.alphabetName);
        if (!regex) {
            throw new Error("Unknown alphabet:", this.alphabetName);
        }

        if (!regex.test(processedMessage)) {
            throw new ValidationError("Invalid characters in the massage for the selected alphabet.", "message")
        }
    }

    valiadateKey(key) {
        const intKey = parseInt(key);

        if (isNaN(intKey) || intKey < config_validator.KEY_MIN || intKey > config_validator.KEY_MAX) {
            throw new ValidationError(`The number must be between ${config.KEY_MIN} and ${config.KEY_MAX}.`, 'key');
        }

        this.intKey = intKey;
    }

    getAlphabetRegex(alphabetName) {
        switch (alphabetName) {
            case "russian":
                return /^[А-Яа-я\s]+$/;
            case "english":
                return /^[A-Za-z\s]+$/;
            default:
                return null;
        }
    }
}