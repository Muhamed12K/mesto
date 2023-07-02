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
const api   = new Api(apiConfig);
let section = {};
let currentUserId = null
// Получить ответ
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        currentUserId = userData._id;
        section = new Section({
            items   : initialCards,
            renderer: createCard
        }, '.photo-grid__list', currentUserId);
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
    popupFormProfile.setButtonLabel('Сохранение...');

    api.setUserInfo(data)
        .then(data => {
            userInfo.setUserInfo(data.name, data.about);
        })
        .finally(() => {
            popupFormProfile.setButtonLabel('Сохранить');
        });
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
const handleCardDel   = function (selector, id) {
    popupFormDelete.open(selector, id);
};

// функция создания карточки
function createCard(data, allowDelete) {
    if (allowDelete) {
        return (new Card(data, '.card-template', handleCardClick))
            .generateCard();
    }

    return (new Card(data, '.card-template', handleCardClick))
        .generateCard();
}

//Функция создания Popup подтверждения удаления
const popupFormDelete = new PopupWithRemoval('.popup_type_delete', function (id, card)  {
    // todo вызвать Апи
    // при получении ответа удлать у себя
    popupFormDelete.renderPreloader(true, 'Удаление...');
    api.deleteCard(id)
        .then(() => {
            card.deleteCard();
            popupFormDelete.close();
        })
        .catch((err) => alert(err))
        .finally( () => {
            popupFormDelete.renderPreloader(false);
        })
}
);
popupFormDelete.setEventListeners();

// Функция создания Popup редактирования аватара
const popupFormAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
    // todo сделать запрос в апи
    // при получении ответа, установить ссылку для аватарки
    popupFormAvatar.setButtonLabel('Сохранение...');

    api.setUserAvatar(data)
        .then(data => {
            userInfo.setUserAvatar(data.avatar);
        })
        .finally( () => {
            popupFormAvatar.setButtonLabel('Сохранить');
        })

});

//Функция открытия Popup аватара
const popupOpenAvatar = document.querySelector(".profile__avatar")
popupOpenAvatar.addEventListener('click', () => {
    popupFormAvatar.open();
})

//  Открытие и закрытие формы добавления карточек
const popupFormCard    = new PopupWithForm('.popup_content_card', (data) => {
    // todo  сделать запрос в апи
    // при получении ответа, добавть карточку в список
    popupFormCard.setButtonLabel('Создание...');

    api.addNewCard(data)
        .then(data => {
            console.log(data)
            section.addItem(createCard(data, currentUserId, true));
        })
        .finally( () => {
            popupFormCard.setButtonLabel('Создать');
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