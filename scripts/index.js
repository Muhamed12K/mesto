// popup формы
let formProfile = document.querySelector("#form-profile");
let formCard = document.querySelector("#form-card");
// атрибуты профиля
let profileName = document.querySelector("#profile-name");
let profileWork = document.querySelector("#profile-work");
let profileEdit = document.querySelector("#profile-edit");
let buttonAddProfile = document.querySelector("#button-add-profile");
// атрибуты формы профиля
// let saveProfile = document.querySelector('#save-profile')
let profailClose = document.querySelector("#cancel-changes-profile");
let nameField = document.querySelector("#name-field");
let infoField = document.querySelector("#info-field");
let popupProfile = document.querySelector("#popup-profile");
// атрибуты карточек
let cardImg = document.querySelectorAll(".card__image");
let cardContainer = document.querySelector("#card-container");
let cardTemplate = document.querySelector("#card-template").content;
let cardDel = document.querySelectorAll("#delete-card");
let cardLike = document.querySelectorAll("#card-like");
// атрибуты popup карточек
let modalCard = document.querySelector("#popup-content");
let notSaveCard = document.querySelector("#not-save-card");
let fieldCard = document.querySelector("#field-card");
let fieldLink = document.querySelector("#field-link");
let createCard = document.querySelector("#createCard");
// атрибуты popup просмотра фотографии
let popupZoom = document.querySelector("#popup-zoom");
let popupFigure = document.querySelector("#popup-figure");
let zoomImg = document.querySelector("#zoom-img");
let imgCaption = document.querySelector("#img-caption");
let zoomClose = document.querySelector("#zoom-close");

// открытие popup
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameField.value;
  profileWork.textContent = infoField.value;

  popupProfile.classList.remove("popup_opened");
}
formProfile.addEventListener("submit", handleFormSubmit);
// закрыть с сохранением, форма профиля
profileEdit.addEventListener("click", function (evt) {
  nameField.value = profileName.innerText;
  infoField.value = profileWork.innerText;
  popupProfile.classList.add("popup_opened");
});
// закрыть без сохранения, форма профиля
profailClose.addEventListener("click", function (evt) {
  popupProfile.classList.remove("popup_opened");
});

// функция лайка
function like(evt) {
  cardLike = evt.target;
  cardLike.classList.toggle("like__color");
}
// функция удаления карточки
function removeCard(evt) {
  cardDel = evt.target.closest(".card");
  cardDel.remove();
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// реализация popup зума
const cardZoom = function (evt) {
  zoomImg.src = evt.target.src;
  zoomImg.alt = evt.target.alt;
  imgCaption.textContent = evt.target.alt;

  popupZoom.classList.add("popup_opened");
};
// закрытие popup зума
zoomClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupZoom.classList.remove("popup_opened");
});

// реализация масива карточек
const cards = function () {
  initialCards.forEach((element) => {
    const directorElement = cardTemplate.cloneNode(true);
    setEvt(directorElement);

    directorElement.querySelector(".card").content =
      directorElement.querySelector(".card__description").content =
      directorElement.querySelector(".card__image").src =
        element.link;
    directorElement.querySelector(".card__taitle").textContent = element.name;

    function setEvt(directorElement) {
      directorElement
        .querySelector(".card__btn_action_like")
        .addEventListener("click", like);
      directorElement
        .querySelector(".card__btn_action_del")
        .addEventListener("click", removeCard);
      directorElement
        .querySelector(".card__image")
        .addEventListener("click", cardZoom);
    }
    cardContainer.prepend(directorElement);
  });
};
cards();
// слушатель добавления карточки
function cardFormSubmit(evt) {
  evt.preventDefault();

  fieldCard.textContent = directorElement.value;
  link.src = fieldLink.value;

  modalCard.classList.remove("popup_opened");
}
formCard.addEventListener("submit", cardFormSubmit);

// открытие формы добавления карточки
buttonAddProfile.addEventListener("click", function (evt) {
  modalCard.classList.add("popup_opened");
});
// закрыть с сохранением, форма добовления карточки
createCard.addEventListener("click", function (evt) {
  evt.preventDefault();

  initialCards.push({
    name: fieldCard.value,
    link: fieldLink.value,
  });

  modalCard.classList.remove("popup_opened");
  cardContainer.innerHTML = "";
  cards();
});
// закрыть без сохранения, форма добавления карточки
notSaveCard.addEventListener("click", function (evt) {
  modalCard.classList.remove("popup_opened");
});
