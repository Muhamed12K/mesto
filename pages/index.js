let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.profile__name');
let jobInput = document.querySelector('.profile__work');
let profInput = document.querySelector('#profile-info');
let profclose = document.querySelector('.popup__btn_action_close');
let cardLikeList = document.querySelectorAll('.card__btn_action_like')

let t_name = document.querySelector('.popup__item_type_name');
let t_work = document.querySelector('.popup__item_type_info');

t_name.value = nameInput.innerText;
t_work.value = jobInput.innerText;


function handleFormSubmit (evt) {
    evt.preventDefault();
    
    nameInput.textContent = t_name.value;
    jobInput.textContent = t_work.value;

    document.querySelector('.popup').classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

profInput.addEventListener('click', function(e){ 
  document.querySelector('.popup').classList.add('popup_opened');
});

profclose.addEventListener('click', function(e){
  document.querySelector('.popup').classList.remove('popup_opened');
});


cardLikeList.forEach(function(item) {
  item.addEventListener('click', function(e) {
    console.log(item);    
    if (e.target.classList.contains('like__color')) {
      e.target.classList.remove('like__color')
    } else {
      e.target.classList.add('like__color');
    }
  });
}); 

// cardLike.addEventListener('click', function(e){
  // document.querySelector('.card__like').classList.remove('like__color');
// });