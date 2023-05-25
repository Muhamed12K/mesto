// иморт класса Card
import { Card } from "./card.js";
// имопрт класса FormValidator
import { FormValidator } from "./FormValidator.js";
// импорт масива карточек
import { initialCards } from "./initialCards.js";

// popup формы
const formProfile = document.querySelector(".popup__form_profile");
const formCard = document.querySelector(".popup__form_card");
// атрибуты профиля
const profileName = document.querySelector(".profile__name");
const profileWork = document.querySelector(".profile__work");
const profileButtonEdit = document.querySelector(".profile__btn_action_edit");
const buttonAddProfile = document.querySelector(".profile__btn_action_add");
// атрибуты формы профиля
const profailClose = document.querySelector(".popup__btn_action_close-porfile");
const nameField = document.querySelector(".popup__item_type_name-profile");
const infoField = document.querySelector(".popup__item_type_info-profile");
const popupProfile = document.querySelector(".popup_profile");
// атрибуты popup карточек
const modalCard = document.querySelector(".popup_content_card");
const notSaveCard = document.querySelector(".popup__btn_action_close-card");
const fieldCard = document.querySelector(".popup__item_type_name-card");
const fieldLink = document.querySelector(".popup__item_type_info-link");
const buttonCreateCard = document.querySelector('.popup__btn_action_submit-card');
// атрибуты popup просмотра фотографии 
const popupZoom = document.querySelector(".popup_content_image"); 
const zoomImg = document.querySelector(".popup__image"); 
const imgCaption = document.querySelector(".popup__image-caption"); 
const zoomClose = document.querySelector(".popup__btn_action_close-zoom"); 

const closePopupByEsc = (event) => {
  if (event.code === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const closePopupByOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

// общая функция открытия всех popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupByEsc);
  popupElement.addEventListener("click", closePopupByOverlay);
}
// общая функция закрытие всех popup 
function closePopup (popupClose) {
  popupClose.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByEsc);
  popupClose.removeEventListener("click", closePopupByOverlay);
}

// открытие popup данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameField.value;
  profileWork.textContent = infoField.value;

  closePopup(popupProfile);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);
// закрыть с сохранением, форма профиля
profileButtonEdit.addEventListener("click", () => {
  openPopup(popupProfile);
  nameField.value = profileName.textContent;
  infoField.value = profileWork.textContent;
  
})
// закрыть без сохранения, форма профиля
profailClose.addEventListener("click", function (evt) {
  closePopup(popupProfile);
});

// открытие формы добавления карточки
buttonAddProfile.addEventListener("click", function (evt) {
  openPopup(modalCard);
});
// закрыть без сохранения, форма добавления карточки
notSaveCard.addEventListener("click", function (evt) {
  closePopup(modalCard);
});
// реализация popup зума 
const cardZoom = function (evt) { 
  zoomImg.src = evt.target.src; 
  zoomImg.alt = evt.target.alt; 
  imgCaption.textContent = evt.target.alt; 
  openPopup(popupZoom); 
}; 
// закрытие popup зума 
zoomClose.addEventListener("click", function (evt) { 
  closePopup(popupZoom); 
});

// функция создания карточки
function createCard (data) {
  return new Card(data, '.card-template', cardZoom);
}
// слушатель добавления карточки
function submitCardForm(evt) {
  evt.preventDefault();

  const nextCard = {
    name: fieldCard.value,
    link: fieldLink.value,
  };
  
  const newCard = createCard(nextCard);

  cardList.prepend(newCard.generateCard());
  closePopup(modalCard);
  formCard.reset();
  
  cardFormValidator.enableValidation();
}

formCard.addEventListener("submit", submitCardForm);

// реализация масива
const cardList = document.querySelector('.photo-grid__list');

const renderElements = (isGrid) => {
  cardList.innerHTML = '';

  initialCards.forEach( (item) =>{
  
    const card = createCard(item)

    const cardElement = card.generateCard();
    cardList.append(cardElement);
  });
}

renderElements();

// реализация валидации
const optionsProfile = {
  formSelector: '.popup__form_profile',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_action_submit:disabled',
  inputErrorClass: 'popup__error_visible',
  errorClass: 'popup__error'
};

const profileFormValidator = new FormValidator(optionsProfile, '.popup__item');
profileFormValidator.enableValidation();

const optionsCard = {
  formSelector: '.popup__form_card',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_action_submit:disabled',
  inputErrorClass: 'popup__error_visible',
  errorClass: 'popup__error'
};

const cardFormValidator = new FormValidator(optionsCard, '.popup__item');
cardFormValidator.enableValidation();