const textOnButton = {
    'encrypt': 'Зашифровать сообщение',
    'decrypt': 'Расшифровать сообщение',
};

class PageUpdateStrategy {
    constructor(elementId) {
        this.elementId = elementId;
    }

    apply() {
        console.log("Method apply() should be change!")
    }
}

class AddClassStrategy extends PageUpdateStrategy {
    constructor(elementId, className) {
        super(elementId);
        this.className = className
    }

    apply() {
        const self = this; // Сохраняем ссылку на `this`
        requestAnimationFrame(function() {
            let element = document.getElementById(self.elementId);
            // console.log(`AddClassStrategy: Adding class "${self.className}" to element with ID "${self.elementId}"`);
            if (element) {
                element.classList.add(self.className);
            } else {
                console.warn(`Element with ID "${self.elementId}" not found for AddClassStrategy`);
            }
        });
    }
}

class RemoveClassStrategy extends PageUpdateStrategy {
    constructor(elementId, className) {
        super(elementId),
        this.className = className;
    }

    apply() {
        const self = this;
        requestAnimationFrame(function() {
            let element = document.getElementById(self.elementId);
            // console.log(`RemoveClassStrategy: Remove class "${self.className}" from element with ID "${self.elementId}"`);
            if (element) {
                element.classList.remove(self.className);
            } else {
                console.warn(`Element with ID "${self.elementId}" not found for RemoveClassStrategy`);
            }
        });
    }
}

class SetButtonTextStrategy extends PageUpdateStrategy {
    constructor(elementId, text) {
        super(elementId),
        this.text = text;
    }

    apply() {
        let element = document.getElementById(this.elementId);
        if (element) {
            element.textContent = this.text;
        }
        else {
            console.warn(`Element with ID "${this.elementId}" not found for AddClassStrategy`);
        }
    }
}

const updateManager = {
    strategies: {
        'encrypt': [
            new AddClassStrategy('decryptedMessageArea', 'available'),
            new AddClassStrategy('footer_area', 'available'),
            new RemoveClassStrategy('main_area', 'available'),
            new RemoveClassStrategy('encryptedMessageArea', 'available'),
            new SetButtonTextStrategy('algorith-start-button', textOnButton['encrypt']),
        ],
        'decrypt': [
            new AddClassStrategy('encryptedMessageArea', 'available'),
            new RemoveClassStrategy('main_area', 'available'),
            new RemoveClassStrategy('decryptedMessageArea', 'available'),
            new RemoveClassStrategy('footer_area', 'available'),
            new SetButtonTextStrategy('algorith-start-button', textOnButton['decrypt']),
        ],
    },

    applyStrategies(operation) {
        const strategies = this.strategies[operation];
        if (strategies) {
            strategies.forEach(strategy => {
                try {
                    strategy.apply()
                } catch (error) {
                    console.log("Error received to apply strategy", strategy);
                }
            });
        }
    }
};


export function initMenuUtils() {
    const algorithmContentArea = document.getElementById('algorithm_content_area');
    if (!algorithmContentArea) {
        console.warn('#algorithm_content_area not found, skipping initialization');
        return;
    }

    algorithmContentArea.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('operation-item')) {
            // const operationItems = algorithmContentArea.querySelectorAll('.operation-item');
            // operationItems.forEach(item => item.classList.remove('selected'));
            target.classList.add('selected');

            const operation = target.dataset.operation;
            updateManager.applyStrategies(operation);
        }
    });
}