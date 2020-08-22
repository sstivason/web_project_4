const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-me');

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  } 
    popup.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

function submitHandler(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    togglePopup();
  }

form.addEventListener('submit', submitHandler);