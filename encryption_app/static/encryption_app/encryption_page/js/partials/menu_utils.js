const textOnButton = {
    'encrypt': 'Зашифровать сообщение',
    'decrypt': 'Расшифровать сообщение',
};

class PageUpdateStrategy {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
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
        if (this.element) {
            this.element.classList.add(this.className);
        }
    }
}

class RemoveClassStrategy extends PageUpdateStrategy {
    constructor(elementId, className) {
        super(elementId),
        this.className = className;
    }

    apply() {
        if (this.element) {
            this.element.classList.remove(this.className);
        }
    }
}

class SetButtonTextStrategy extends PageUpdateStrategy {
    constructor(elementId, text) {
        super(elementId),
        this.text = text;
    }

    apply() {
        if (this.element) {
            this.element.textContent = this.text;
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
            new RemoveClassStrategy('encryptedmessageArea', 'available'),
            new SetButtonTextStrategy('algorith-start-button', textOnButton['encrypt']),
        ],
        'decrypt': [
            new AddClassStrategy('encryptedMessageArea', 'available'),
            new AddClassStrategy('encryptedmessageArea', 'available'),
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

function select_element_in_cryptoMenu() {
    const cryptoMenu = document.querySelector('.crypto-menu');
    let selectedItem_operation = null;

    cryptoMenu.addEventListener('click', function(event) {
        let target = event.target;

        if (target.classList.contains('operation-item')) {
            if (selectedItem_operation) {
                selectedItem_operation.classList.remove('selected');
            }
            target.classList.add('selected');
            selectedItem_operation = target;

            const operation = selectedItem_operation.dataset.operation;
            updateManager.applyStrategies(operation);
        }
    });
}

export function initMenuUtils() {
    select_element_in_cryptoMenu();
}