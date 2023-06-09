import Popup from "./popup.js";
export class PopupWithImag extends Popup{
    constructor(selector) {
        super(selector);
        this._imageZoom = document.querySelector(".popup__image");
        this._imageCaption = document.querySelector(".popup__image-caption");
    };

    open(data) {
        super.open();
        console.log(data);
        this._imageZoom.src = data.link;
        this._imageCaption.textContent = data.name;
        this._imageZoom.alt = data.name;
    }
}