import {Api} from "./Api";
import apiConfig from "./ApiConfig";

class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleCardDel) {
        this._userId           = userId;
        this._image            = data.link;
        this._alt              = data.name;
        this._title            = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick  = handleCardClick;
        this._handleCardDel    = handleCardDel;
        this._likes            = data.likes;
        this._id               = data._id;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').src             = this._image;
        this._element.querySelector('.card__taitle').textContent    = this._title;
        this._element.querySelector('.card__image').alt             = this._alt;
        this._element.querySelector('.card__like-span').textContent = this._likes.length;
        this._likesElement = this._element.querySelector('.card__like-span')
        this._likeCard = this._element.querySelector('.card__btn_action_like');

        this._likes.forEach((item) => {
            if (item._id === this._userId) {
                this._likeCard.classList.add('card__like_color');
            }
        });

        if (!this._handleCardDel) {
            this._element.querySelector('.card__btn_action_del').remove();
        }
        return this._element;
    }

    _like() {
        const api      = new Api(apiConfig);

        if (!this._likeCard.classList.contains('card__like_color')) {
            api.putCardLike(this._id)
                .then(r => {
                    this._likeCard.classList.add('card__like_color');
                    this._likesElement.textContent = r.likes.length;
                });
        } else {
            api.deleteCardLike(this._id)
                .then(r => {
                    this._likeCard.classList.remove('card__like_color');
                    this._likesElement.textContent = r.likes.length;
                });
        }
    }

    // функция удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        if (this._handleCardDel) {
            this._element
                .querySelector('.card__btn_action_del')
                .addEventListener('click', () => {
                    this._handleCardDel(this, this._id);
                });
        }

        this._element
            .querySelector('.card__btn_action_like')
            .addEventListener('click', () => {
                this._like()
            });

        this._element
            .querySelector('.card__image')
            .addEventListener('click', (evt) => {
                this._handleCardClick({
                    link: this._image,
                    name: this._title
                });
            });
    }
}

export {Card};