class FormValidator {
    constructor(options, element) {
        this._options    = options;
        this._element    = element;
        this._form       = document.querySelector(this._options.formSelector);
        this._formInputs = Array.from(this._form.querySelectorAll(this._element));
        this._formButton = this._form.querySelector(this._options.submitButtonSelector);
    }

    _isValid(input) {
        const currentInputError = document.querySelector(`#${input.id}-error`);

        if (input.validity.valid) {
            currentInputError.textContent = '';
            currentInputError.classList.remove(this._options.inputErrorClass)
        } else {
            currentInputError.textContent = input.validationMessage;
            currentInputError.classList.add('visible');
        }
    }

    _hasErrors(inputList) {
        return inputList.some((item) => {
            return !item.validity.valid
        })
    }

    _enableButton() {
        this._formButton.classList.remove(this._options.inactiveButtonClass);
        this._formButton.removeAttribute('disabled')
    }

    disableButton() {
        this._formButton.classList.add(this._options.inactiveButtonClass);
        this._formButton.setAttribute('disabled', true)
    }

    _setEventHandlers() {
        this.disableButton();
        this._formInputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(input)

                if (this._hasErrors(this._formInputs)) {
                    this.disableButton(this._formButton);
                } else {
                    this._enableButton(this._formButton);
                }
            });
        });
    }

    enableValidation() {

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })

        this._setEventHandlers();
    }
}

export {FormValidator};