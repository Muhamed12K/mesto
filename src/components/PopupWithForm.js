import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this.submitCallback = submitCallback;
        this._formSubmit    = this._popup.querySelector('.popup__form');
        this._inputList     = Array.from(this._formSubmit.querySelectorAll('.popup__item'));
        this._buttonSubmit  = this._formSubmit.querySelector('.popup__btn_action_submit');
    }

    renderPreloader(loading, displayText) {
        if (!this._buttonSubmit) return;
        if (loading) {
            this.defaulText                = this._buttonSubmit.textContent;
            this._buttonSubmit.textContent = displayText;
        } else {
            this._buttonSubmit.textContent = this.defaulText;
        }
    }
    // Получить входные значения input
    _getInputValues() {
        this._inputsValues = {};
        this._inputList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });
        return this._inputsValues;
    }

    // Функция наполнения формы input
    setInputValues = (data) => {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    // Функция закрытия формы и ее очистки
    close() {
        this._formSubmit.reset();
        super.close();
    }

    // Слушатели
    setEventListeners() {
        super.setEventListeners();

        this._formSubmit.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this.submitCallback(this._getInputValues());
            this.close();
        });
    }
}

export {PopupWithForm};
