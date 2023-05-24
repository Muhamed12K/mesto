  class FormValidator {
    constructor(options, element) {
      this._options = options;
      this._element = element
    }
  
    _isValid(input) {
      const currentInputError = document.querySelector(`#${input.id}-error`);
      
      if (input.validity.valid){
        currentInputError.textContent = '';
        currentInputError.classList.remove(this._options.inputErrorClass)
      } else{
        currentInputError.textContent = input.validationMessage;
        currentInputError.classList.add('visible');
      }
    }

    _hasErrors(inputList) {
      return inputList.some((item) => { return !item.validity.valid })
    }

    _enableButton(button) {
      button.classList.remove(this._options.inactiveButtonClass);
      button.removeAttribute('disabled')
    }

    _disableButton(button) {
      button.classList.add(this._options.inactiveButtonClass);
      button.setAttribute('disabled', true)
    }

    _setEventHandlers(form) {
      const formInputs = Array.from(form.querySelectorAll(this._element));
      const formButton = form.querySelector(this._options.submitButtonSelector);

      this._disableButton(formButton);

      formInputs.forEach((input) => {
        input.addEventListener('input', () => {
          this._isValid(input)

          if (this._hasErrors(formInputs)){
            this._disableButton(formButton)
          } else {
            this._enableButton(formButton)
          }
        }
    );
      });
    }
    
    enableValidation() {
      const form = document.querySelector(this._options.formSelector);

      form.addEventListener('submit', (evt) =>{
          evt.preventDefault()
      })

      this._setEventHandlers(form);
    }
  }

  export{FormValidator};

// const optionsProfile = {
//   formSelector: '.popup__form_profile',
//   submitButtonSelector: '.popup__btn',
//   inactiveButtonClass: 'popup__btn_action_submit:disabled',
//   inputErrorClass: 'popup__error_visible',
//   errorClass: 'popup__error'
// };

// const profileForm = new FormValidator(optionsProfile, '.popup__item');
// profileForm.enableValidation();

// const optionsCard = {
//   formSelector: '.popup__form_card',
//   submitButtonSelector: '.popup__btn',
//   inactiveButtonClass: 'popup__btn_action_submit:disabled',
//   inputErrorClass: 'popup__error_visible',
//   errorClass: 'popup__error'
// };

// const cardForm = new FormValidator(optionsCard, '.popup__item');
// cardForm.enableValidation();