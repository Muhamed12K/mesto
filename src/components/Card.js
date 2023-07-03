class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleCardDel, handleLike) {
        this._alt     = data.name;
        this._id      = data._id;
        this._image   = data.link;
        this._likes   = data.likes;
        this._title   = data.name;
        this._ownerId = data.owner._id;
        this._userId  = userId;

        this._templateSelector = templateSelector;
        this._handleCardClick  = handleCardClick;
        this._handleCardDel    = handleCardDel;
        this._handleLike       = handleLike;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _isOwnCard() {
        return this._userId === this._ownerId;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').src         = this._image;
        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').alt         = this._alt;

        this._likesCount = this._element.querySelector('.card__like-span')
        this._likeCard   = this._element.querySelector('.card__btn_action_like');

        if (!this._isOwnCard()) {
            this._element.querySelector('.card__btn_action_del').remove();
        }

        this._updateLikesView();

        return this._element;
    }

    updateLikes(likes) {
        this._likes = likes;
        this._updateLikesView();
    }

    isLiked() {
        return this._likes.some((like) => like._id === this._userId);
    }

    _updateLikesView() {
        this._likesCount.textContent = this._likes.length;
        this._likeCard.classList.toggle('card__like_color', this.isLiked());
    }

    // функция удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
            this._element
                .querySelector('.card__btn_action_del')
                .addEventListener('click', () => {
                    this._handleCardDel(this, this._id);
                });

        this._element
            .querySelector('.card__btn_action_like')
            .addEventListener('click', () => {
                this._handleLike(this, this.isLiked())
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