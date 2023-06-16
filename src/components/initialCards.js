const img0 = new URL("../images/arkhyz.jpg", import.meta.url);
const img1 = new URL("../images/chelyabinsk-oblast.jpg", import.meta.url);
const img2 = new URL("../images/ivanovo.jpg", import.meta.url);
const img3 = new URL("../images/kamchatka.jpg", import.meta.url);
const img4 = new URL("../images/kholmogorsky-rayon.jpg", import.meta.url);
const img5 = new URL("../images/baikal.jpg", import.meta.url);
const initialCards = [
  {
    name: "Архыз",
    link: img0,
  },
  {
    name: "Челябинская область",
    link: img1,
  },
  {
    name: "Иваново",
    link: img2,
  },
  {
    name: "Камчатка",
    link: img3,
  },
  {
    name: "Холмогорский район",
    link: img4,
  },
  {
    name: "Байкал",
    link: img5,
  },
];
export{initialCards};