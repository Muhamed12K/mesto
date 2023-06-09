class PopupWithForm extends Popup {
    constructor(selector, submitFormProfile) {
        super(selector);
        this._submit  = submitFormProfile;
    };

    close() {
        super.close();
        this.formProfile = document.querySelector(".popup__form_profile");
        this.formProfile.reset();
    }

    _getInputValues() {
        const inputValues = {};
        this._node.querySelectorAll('input').forEach(input => {
            inputValues[input] = input.value;
        });
        return inputValues;
    };

    setEventListeners(){

        super.setEventListeners();

        this._node.addEventListener("submit", () => {
            this.close();
            this._submit();
        });
    }
}