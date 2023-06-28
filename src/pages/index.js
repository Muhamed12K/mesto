import './index.css';
import {Card} from "../components/Сard.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImag} from "../components/PopupWithImag.js";
import {Section} from "../components/Section.js";
import {initialCards, apiConfig} from "../components/initialCards.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithRemoval} from "../components/PopupWithRemoval.js";
import { Api } from '../components/Api.js';

// API
const api = new Api(apiConfig);

// Получить ответ
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
    .then(([resUser, resCard]) => {
        userCurrentId = resUser._id;
        userInfo.setUserInfo(resUser);
        userInfo.setUserAvatar(resUser);
        section.render(resCard, userCurrentId)
    })
    .catch((err) => alert(err))

// получение данных полей формы
const userInfo = new UserInfo({
    selectorUserAvatar: '.profile__image',
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

//Функция создания Popup подтверждения удаления
const popupFormDelete = new PopupWithRemoval('.popup_type_delete', {
    submitCallback: (id, card) => {
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
})
const btnDelCard = document.querySelector(".card__btn_action_del")
btnDelCard.addEventListener('click', () => {
    popupFormDelete.open();
})

// Функция создания Popup редактирования аватара
const popupFormAvatar = new PopupWithForm('.popup_type_avatar', {
    submitCallback: (data) => {
        popupFormAvatar.renderPreloader(true, 'Загрузка...')
        api.setUserAvatar(data.name)
            .then( () => {
                userInfo.setUserAvatar();
                popupFormAvatar.close();
            })
            .catch((err) => alert(err))
            .finally(() => {
                popupFormAvatar.renderPreloader(false);
            })
    }
})
//Функция открытия Popup аватара
const popupOpenAvatar = document.querySelector(".profile__avatar")
popupOpenAvatar.addEventListener('click', () => {
    popupFormAvatar.open();
})

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
const optionsAvatar = {
    formSelector: '.popup__form_type_avatar',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_action_submit:disabled',
    inputErrorClass: 'popup__error_visible',
    errorClass: 'popup__error'
}
const avatarFormValidator = new FormValidator(optionsAvatar, 'popup__item')
avatarFormValidator.enableValidation();

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

popupFormAvatar.setEventListeners()
popupFormProfile.setEventListeners();
popupWithImag.setEventListeners();
popupFormCard.setEventListeners();