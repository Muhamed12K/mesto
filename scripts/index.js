let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.profile__name');
let jobInput = document.querySelector('.profile__work');
let profInput = document.querySelector('.profile__btn_action_edit');
let profclose = document.querySelector('.popup__btn_action_close');
let cardLikeList = document.querySelectorAll('.card__btn')
let tName = document.querySelector('.popup__item_type_name');
let tWork = document.querySelector('.popup__item_type_info');
let modal = document.querySelector('.popup');

function handleFormSubmit (evt) {
    evt.preventDefault();
    
    nameInput.textContent = tName.value;
    jobInput.textContent = tWork.value;

    modal.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

profInput.addEventListener('click', function(e){
  tName.value = nameInput.innerText;
  tWork.value = jobInput.innerText;
  modal.classList.add('popup_opened');
});

profclose.addEventListener('click', function(e){
  modal.classList.remove('popup_opened');
});

// cardLikeList.forEach(function(item) {
//   item.addEventListener('click', function(e) {
//     console.log(item);    
//     if (e.target.classList.contains('like__color')) {
//       e.target.classList.remove('like__color')
//     } else {
//       e.target.classList.add('like__color');
//     }
//   });
// });