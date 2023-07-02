import './index.css';

import apiConfig from '../components/ApiConfig.js';
import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImag} from '../components/PopupWithImag.js';
import {PopupWithRemoval} from '../components/PopupWithRemoval.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';

// API
const api         = new Api(apiConfig);

let section       = {};
let currentUserId = null
// Получить ответ
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        currentUserId = userData._id;
        section       = new Section({
            items   : initialCards,
            renderer: createCard
        }, '.photo-grid__list');
        section.render();

        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUserAvatar(userData.avatar);

    })
    .catch((err) => alert(err))

// получение данных полей формы
const userInfo = new UserInfo({
    selectorUserAvatar: '.profile__image',
    selectorUserName  : '.profile__name',
    selectorUserInfo  : '.profile__work',
})

// редактирование Popup профиля
const popupFormProfile = new PopupWithForm('.popup_profile', (data) => {

    popupFormProfile.renderPreloader(true,'Сохранение...');
    api.setUserInfo(data)
        .then(data => {
            userInfo.setUserInfo(data.name, data.about);
        })
        .catch((err) => alert(err))
        .finally(() => {
            popupFormProfile.renderPreloader(false);
        })
});

// Функция открытия Popup профиля
const profileButtonEdit = document.querySelector(".profile__btn_action_edit");
profileButtonEdit.addEventListener('click', () => {
    popupFormProfile.open();
    popupFormProfile.setInputValues(userInfo.getUserInfo());
});

// зум картинки
const popupWithImag   = new PopupWithImag('.popup_content_image');
const handleCardClick = function (data) {
    popupWithImag.open(data);

};

const handleCardDel = function (selector, id) {
    popupFormDelete.open(selector, id);
};

// функция создания карточки
function createCard(data, allowDelete) {
    if (allowDelete) {
        return (new Card(data, currentUserId, '.card-template', handleCardClick, handleCardDel))
            .generateCard();
    }
    return (new Card(data, currentUserId, '.card-template', handleCardClick))
        .generateCard();
}

//Функция создания Popup подтверждения удаления
const popupFormDelete = new PopupWithRemoval('.popup_type_delete', function (id, card) {

        popupFormDelete.renderPreloader(true, 'Удаление...');
        api.deleteCard(id)
            .then(() => {
                card.deleteCard();
                popupFormDelete.close();
            })
            .catch((err) => alert(err))
            .finally(() => {
                popupFormDelete.renderPreloader(false);
            })
    }
);
popupFormDelete.setEventListeners();

// Функция создания Popup редактирования аватара
const popupFormAvatar = new PopupWithForm('.popup_type_avatar', (data) => {

    popupFormAvatar.renderPreloader(true,'Сохранение...');
    api.setUserAvatar(data)
        .then(data => {
            userInfo.setUserAvatar(data.avatar);
        })
        .catch((err) => alert(err))
        .finally(() => {
            popupFormAvatar.renderPreloader(false);
        })

});

//Функция открытия Popup аватара
const popupOpenAvatar = document.querySelector(".profile__avatar")
popupOpenAvatar.addEventListener('click', () => {
    popupFormAvatar.open();
})

//  Открытие и закрытие формы добавления карточек
const popupFormCard    = new PopupWithForm('.popup_content_card', (data) => {

    popupFormCard.renderPreloader(true,'Создание...');
    api.addNewCard(data)
        .then(data => {
            section.addItem(createCard(data, currentUserId, true));
        })
        .catch((err) => alert(err))
        .finally(() => {
            popupFormCard.renderPreloader(false);
        })
});
const buttonCreateCard = document.querySelector(".profile__btn_action_add");
buttonCreateCard.addEventListener('click', () => {
    popupFormCard.open();
});
const optionsAvatar       = {
    formSelector        : '.popup__form_type_avatar',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass : 'popup__btn_action_submit:disabled',
    inputErrorClass     : 'popup__error_visible',
    errorClass          : 'popup__error'
}
const avatarFormValidator = new FormValidator(optionsAvatar, '.popup__item');
avatarFormValidator.enableValidation();

// реализация валидации
const optionsProfile = {
    formSelector        : '.popup__form_profile',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass : 'popup__btn_action_submit:disabled',
    inputErrorClass     : 'popup__error_visible',
    errorClass          : 'popup__error'
};

const profileFormValidator = new FormValidator(optionsProfile, '.popup__item');
profileFormValidator.enableValidation();

const optionsCard = {
    formSelector        : '.popup__form_card',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass : 'popup__btn_action_submit:disabled',
    inputErrorClass     : 'popup__error_visible',
    errorClass          : 'popup__error'
};

const cardFormValidator = new FormValidator(optionsCard, '.popup__item');
cardFormValidator.enableValidation();

popupFormAvatar.setEventListeners()
popupFormProfile.setEventListeners();
popupWithImag.setEventListeners();
popupFormCard.setEventListeners();