const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) =>{
      evt.preventDefault()
    })
    setFormEvent(form, rest);
  });
};
const setFormEvent = (formValidate, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputs = Array.from(formValidate.querySelectorAll(inputSelector));
  const formButton = formValidate.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkValid(input, rest)
      if(invalidInput(formInputs)){
      disableButton(formButton, rest)
      }
      else{
        enableButton(formButton, rest)
      }
    }
);
  });
};
const checkValid = (input, {inputErrorClass, ...rest}) => {
  const currentInputError = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid){
    currentInputError.textContent = '';
    currentInputError.classList.remove(inputErrorClass)
  } else{
    currentInputError.textContent = input.validationMessage;
    currentInputError.classList.add('visible');
  }
}

const disableButton = (button, {inactiveButtonClass}) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true)
}
const enableButton = (button, {inactiveButtonClass}) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled')
}
const invalidInput = (formInputs) => {
  return formInputs.some((item) => { return !item.validity.valid})
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_action_submit:disabled',
  inputErrorClass: 'popup__error_visible',
  errorClass: 'popup__error'
  });