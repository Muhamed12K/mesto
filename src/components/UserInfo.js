class UserInfo {
    constructor(data) {

        this._profileName = document.querySelector(data.selectorUserName);
        this._profileinfo = document.querySelector(data.selectorUserInfo);
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

export {UserInfo};