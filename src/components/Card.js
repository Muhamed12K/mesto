import {PopupWithImag} from "./PopupWithImag";

class Card {
    constructor(data, /*serId, handleCardDeleteLike, handlecardLike*/ templateSelector, handleCardDel/*, handleCardClick, */) {

        // this._removeLike = handleCardDeleteLike;
        // this._putlike          = handlecardLike;
        // this._userId           = userId;
        this._image            = data.link;
        this._alt              = data.name;
        this._title            = data.name;
        this._templateSelector = templateSelector;
        // this._handleCardClick  = handleCardClick;
        this._handleCardDel    = handleCardDel;
        this._likes            = data.likes;
        this.idCard            = data._id;
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

        // this._element.addEventListener('click', () => this._handleCardClick());

        if (!this._handleCardDel) {
            this._element.querySelector('.card__btn_action_del').remove();
        }

        return this._element;
    }

    // функция лайка
    //
    // likesCard() {
    //     return this._likes.some(like => like._id === this._userId)
    // }
    _like() {
        // todo добавить запрос к апи
        // при получении ответа увеличить счеетчик на 1
        // this._element.querySelector('.card__like-span').textContent = data._likes.length;
    //
        const likeCard = this._element.querySelector('.card__btn_action_like');
        likeCard.classList.toggle('card__like_color');
    }

    // togleLike() {
    //     if (this.likesCard()) {
    //         this._removeLike(this.idCard);
    //     } else {
    //         this._putlike(this.idCard)
    //     }
    // }

    // renderCardLike(card) {
    //     this._likes = card.likes;
    //   if(this._likes.length === 0) {
    //       this._element.textContent = '0';
    //   }  else {
    //       this._element.textContent = this._likes.length
    //   }
    //   if(this.likesCard()) {
    //       this._like()
    //   } else {
    //      this._like.remove();
    //   }
    // }

    // функция удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
            this._element
                .querySelector('.card__btn_action_del')
                .addEventListener('click', () => {
                    this._handleCardDel(this, this.idCard);
                });

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
        this._element.addEventListener('click', () => this._handleCardClick());
    }
}

export {Card};