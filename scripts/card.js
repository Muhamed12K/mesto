class Card {
  constructor(data, templateSelector, cardZoom) {

    this._image = data.link;
    this._alt = data.name;
    this._title = data.name;
    this._templateSelector = templateSelector;
    this._zoomImagePopup = cardZoom;
   
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;    
  }

  // функция лайка
  _like() {
    const likeCard = this._element.querySelector('.card__btn_action_like');
    likeCard.classList.toggle('card__like_color');
  }
  // функция удаления карточки
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__btn_action_del')
      .addEventListener('click', () => {
        this._removeCard();
      });

    this._element
      .querySelector('.card__btn_action_like')
      .addEventListener('click', () => {
        this._like();
      });

    this._element
      .querySelector('.card__image')
      .addEventListener('click', (evt) => {
      this._zoomImagePopup(evt);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__taitle').textContent = this._title;
    this._element.querySelector('.card__image').alt = this._alt;

    
    return this._element;
  }
}

export{Card};