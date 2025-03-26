let element = null;

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
            element = document.getElementById(self.elementId);
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
            element = document.getElementById(self.elementId);
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
        element = document.getElementById(this.elementId);
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
            new AddClassStrategy('decryptedMessageArea', 'disabled_element'),
            new AddClassStrategy('footer_area', 'disabled_element'),
            new AddClassStrategy('toggleWrapper', 'available_toggleWrapper'),
            new RemoveClassStrategy('main_area', 'disabled_element'),
            new RemoveClassStrategy('encryptedMessageArea', 'disabled_element'),
            new SetButtonTextStrategy('algorith-start-button', textOnButton['encrypt']),
        ],
        'decrypt': [
            new AddClassStrategy('encryptedMessageArea', 'disabled_element'),
            new RemoveClassStrategy('main_area', 'disabled_element'),
            new RemoveClassStrategy('toggleWrapper', 'available_toggleWrapper'),
            new RemoveClassStrategy('decryptedMessageArea', 'disabled_element'),
            new SetButtonTextStrategy('algorith-start-button', textOnButton['decrypt']),
        ],
        'keyIsNotKnown': [
            new AddClassStrategy('decryptedMessageArea', 'disabled_element'),
            new RemoveClassStrategy('footer_area', 'disabled_element'),
        ],
        'keyIsKnown': [
            new RemoveClassStrategy('decryptedMessageArea', 'disabled_element'),
            new AddClassStrategy('footer_area', 'disabled_element'),
        ]
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
    const ensureElementExists = (elementId) => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`#${elementId} not found, skipping related functionality`);
            return null;
        }
        return element;
    };

    const contentArea = ensureElementExists('algorithm_content_area');
    const inputKey = ensureElementExists('keyInput');;

    if (!contentArea) {
        return;
    }

    let selectedItem = null;
    contentArea .addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('operation-item')) {
            handleOperationItemClick(target);
        }

        if (target.matches('input[type="checkbox"]')) {
            handleCheckboxChange(target);
        }
    });

    function handleOperationItemClick(target) {
        if (selectedItem) {
            selectedItem.classList.remove('selected');
        }
        target.classList.add('selected');
        selectedItem = target;

        const operation = target.dataset.operation;
        if (operation) {
            updateManager.applyStrategies(operation);
        } else {
            console.warn('No operation specified for this item.');
        }
    }

    function handleCheckboxChange(checkbox) {
      if (inputKey)
      {
            if (checkbox.checked) {
                inputKey.classList.add('disabled_keyInput');
                updateManager.applyStrategies('keyIsNotKnown');
            } else {
                inputKey.classList.remove('disabled_keyInput');
                updateManager.applyStrategies('keyIsKnown');
            }
      } else {
          console.warn('KeyInput not found');
      }
    }
}