import Popup from "./Popup.js";

export class PopupWithImag extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._imageZoom    = document.querySelector(".popup__image");
        this._imageCaption = document.querySelector(".popup__image-caption");
    };

    open(data) {
        this._imageZoom.src            = data.link;
        this._imageCaption.textContent = data.name;
        this._imageZoom.alt            = data.name;

        super.open();
    }
}