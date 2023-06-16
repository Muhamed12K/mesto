import './index.css';
import {Card} from "../components/card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImag} from "../components/PopupWithImag.js";
import {Section} from "../components/Section.js";
import {initialCards} from "../components/initialCards.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";

// получение данных полей формы
const userInfo = new UserInfo({
    selectorUserName: '.profile__name',
    selectorUserInfo: '.profile__work',
})

// редактирование Popup профиля
const popupFormProfile = new PopupWithForm('.popup_profile', (data) => {
    userInfo.setUserInfo(data.name, data.info);
});

// Функция открытия Popup профиля
const profileButtonEdit = document.querySelector(".profile__btn_action_edit");
profileButtonEdit.addEventListener('click', () => {
    popupFormProfile.open();
    popupFormProfile.setInputValues(userInfo.getUserInfo());
});
// зум картинки
const popupWithImag = new PopupWithImag('.popup_content_image');
const handleCardClick = function (data) {
    popupWithImag.open(data);
};

// функция создания карточки
function createCard(data) {
    return (new Card(data, '.card-template', handleCardClick))
        .generateCard();
}

const section = new Section({
    items: initialCards,
    renderer: createCard
}, '.photo-grid__list');
section.render();

//  Открытие и закрытие формы добавления карточек
const popupFormCard = new PopupWithForm('.popup_content_card', (data) => {
    section.addItem(createCard({
        name: data.title,
        link: data.link
    }));
});
const buttonCreateCard = document.querySelector(".profile__btn_action_add");
buttonCreateCard.addEventListener('click', () => {
    popupFormCard.open();
});

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

popupFormProfile.setEventListeners();
popupWithImag.setEventListeners();
popupFormCard.setEventListeners();