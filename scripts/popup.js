export default class Popup {
    constructor( selector ) {
        this._node = document.querySelector(selector);
    };

    open() {
        this._node.classList.add("popup_opened");
    };

    close() {
        this._node.classList.remove("popup_opened");
    };

    _handleEscClose() {
        const closePopupByEsc = (event) => {
            if (event.code === "Escape") {
                this.close(document.querySelector(".popup_opened"));
            }
        };
    };

    setEventListeners() {
        const closePopupByOverlay = (event) => {
            if (event.target === event.currentTarget) {
                this.close(event.currentTarget);
            }
        };
        this.close.addEventListener("click", closePopupByOverlay);

        window.addEventListener("keydown", this._handleEscClose);
    };

}