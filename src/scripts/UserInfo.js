class UserInfo {
    constructor({ selectorUserName, selectorUserinfo}) {
        this._profileName = selectorUserName;
        this._profileinfo = selectorUserinfo;
        this._profileName = document.querySelector('.profile__name');
        this._profileinfo = document.querySelector('.profile__work');
    }

    // Функция получения информации из профиля
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            info: this._profileinfo.textContent,
        }
    }

    // Функция добавления информации в профиль из формы
    setUserInfo(name, info) {
        this._profileName.textContent = name;
        this._profileinfo.textContent = info;
    }
}

export { UserInfo };