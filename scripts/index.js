// popup формы
const formProfile = document.querySelector("#form-profile");
const formCard = document.querySelector("#form-card");
const popupElement = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__btn_action_close")
// атрибуты профиля
const profileName = document.querySelector("#profile-name");
const profileWork = document.querySelector("#profile-work");
const profileButtonEdit = document.querySelector("#profile-edit");
const buttonAddProfile = document.querySelector("#button-add-profile");
// атрибуты формы профиля
const profailClose = document.querySelector("#cancel-changes-profile");
const nameField = document.querySelector("#name-field");
const infoField = document.querySelector("#info-field");
const popupProfile = document.querySelector("#popup-profile");
// атрибуты карточек
const cardContainer = document.querySelector("#card-container");
const cardTemplate = document.querySelector("#card-template").content;
// атрибуты popup карточек
const modalCard = document.querySelector("#popup-content");
const notSaveCard = document.querySelector("#not-save-card");
const fieldCard = document.querySelector("#field-card");
const fieldLink = document.querySelector("#field-link");
// атрибуты popup просмотра фотографии
const popupZoom = document.querySelector("#popup-zoom");
const zoomImg = document.querySelector("#zoom-img");
const imgCaption = document.querySelector("#img-caption");
const zoomClose = document.querySelector("#zoom-close");

// общая функция открытия всех popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}
// общая функция закрытие всех popup 
function closePopup (popupClose) {
  popupClose.classList.remove("popup_opened");
}

// открытие popup данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameField.value;
  profileWork.textContent = infoField.value;

  closePopup(popupProfile);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);
// закрыть с сохранением, форма профиля
profileButtonEdit.addEventListener("click", () => {
  openPopup(popupProfile);
  nameField.value = profileName.textContent;
  infoField.value = profileWork.textContent;
})
// закрыть без сохранения, форма профиля
profailClose.addEventListener("click", function (evt) {
  closePopup(popupProfile);
});

// функция лайка
function like(evt) {
  let likeListCards = document.querySelectorAll(".card__btn_action_like");

  likeListCards = evt.target;
  likeListCards.classList.toggle("card__like_color");
}
// функция удаления карточки
function removeCard(evt) {
  let listDelCards = document.querySelectorAll("#delete-cards");

  listDelCards = evt.target.closest(".card");
  listDelCards.remove();
}
// масив карточек 
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
  openPopup(popupZoom);
};
// закрытие popup зума
zoomClose.addEventListener("click", function (evt) {
  closePopup(popupZoom);
});
// реализация масива карточек
function createCard(item) {   
  const cardElement = cardTemplate.cloneNode(true);
  setEvt(cardElement);

  cardElement.querySelector(".card").content =
  cardElement.querySelector(".card__description").content =
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__taitle").textContent = item.name;
  function setEvt(cardElement) {
    cardElement
      .querySelector(".card__btn_action_like")
      .addEventListener("click", like);
    cardElement
      .querySelector(".card__btn_action_del")
      .addEventListener("click", removeCard);
    cardElement
      .querySelector(".card__image")
      .addEventListener("click", cardZoom);
  }
  return cardElement;
}
// открытие формы добавления карточки
buttonAddProfile.addEventListener("click", function (evt) {
  openPopup(modalCard);
});
// закрыть без сохранения, форма добавления карточки
notSaveCard.addEventListener("click", function (evt) {
  closePopup(modalCard);
});
// слушатель добавления карточки
function cardFormSubmit(evt) {
  evt.preventDefault();

  const nextCard = {
    name: fieldCard.value,
    link: fieldLink.value,
  };
  
  const newCard = createCard(nextCard);
  cardContainer.prepend(newCard);
  closePopup(modalCard);
}
formCard.addEventListener("submit", cardFormSubmit);
function addCard(cardElement) {
  cardContainer.prepend(cardElement);
}
function renderCards() {
  initialCards.reverse().forEach(item => {
    const cardHTML = createCard(item);
    addCard(cardHTML);
  })
}
renderCards();