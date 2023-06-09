class UserInfo {
    constructor(object) {
        this._name = document.querySelector('.popup__item_type_name-profile');
        this._info = document.querySelector('.popup__item_type_info-profile');
    };

    getUserInfo() {
        this._name.textContent;
        this._info.textContent;
    };

    setUserInfo(data) {
        this._name.textContent = data._name;
        this._info.textContent = data._info;
    };
}