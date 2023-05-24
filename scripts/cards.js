class Card {
  constructor(data, templateSelector) {

    this._image = data.link;
    this._alt = data.name;
    this._title = data.name;
    this._templateSelector = templateSelector;
    
    this._popupZoom = document.querySelector(".popup_content_image");
    this._zoomClose = document.querySelector(".popup__btn_action_close_zoom");
    this._zoomImg = document.querySelector(".popup__image");
    this._imgCaption = document.querySelector(".popup__image-caption");
  }

  _closePopupByEsc = (event) => {
    if (event.code === "Escape") {
      this._closePopup(document.querySelector(".popup_opened"));
    }
  };
  
  _closePopupByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this._closePopup(event.currentTarget);
    }
  };
  
  // общая функция открытия всех popup
  _openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    window.addEventListener("keydown", this._closePopupByEsc);
    popupElement.addEventListener("click",this. _closePopupByOverlay);
  }
  // общая функция закрытие всех popup 
  _closePopup (popupClose) {
    popupClose.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._closePopupByEsc);
    popupClose.removeEventListener("click", this._closePopupByOverlay);
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
    const listDelCards = this._element.closest(".card");
    listDelCards.remove();
  }

  _zoomImagePopup(){
    this._zoomImg.src = this._image;
    this._imgCaption.textContent = this._title;
    this._openPopup(this._popupZoom);
  }

  _zoomClosePopup(){
    this._zoomImg.src = '';
    this._closePopup(this._popupZoom);
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
      .addEventListener('click', () => {
      this._zoomImagePopup();
    });
    
    this._zoomClose.addEventListener('click', () => {
      this._zoomClosePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__taitle').textContent = this._title;
    
    return this._element;
  }
}

export{Card};

// const renderElements = (isGrid) => {
//   cardList.innerHTML = '';

//   initialCards.forEach( (item) =>{
  
//     const card = new Card(item, '.card-template')

//     const cardElement = card.generateCard();
//     cardList.append(cardElement);
//   });
// }

// renderElements();