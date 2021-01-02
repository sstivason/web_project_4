import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from './initialCards.js';
import {togglePopup, saveButtonDisabled} from './utils.js';

const defaultConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error_visible'
};

//Modal Containers

const addCardModalWindow = document.querySelector('.popup_type_add-card');
const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');
const imageModalWindow = document.querySelector('.popup_type_image');


//Input Fields

const inputName = document.querySelector('.popup__input_type_name');
const inputAboutme = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAboutme = document.querySelector('.profile__about-me');
const inputTitle = document.querySelector('.popup__input_type_card-title');
const inputLink = document.querySelector('.popup__input_type_url'); 


//Buttons

const editButton = document.querySelector('.profile__edit-button');
const closeProfileButton = editProfileModalWindow.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__post-button');
const closeCardButton = addCardModalWindow.querySelector('.popup__close-button');
const closeImageButton = imageModalWindow.querySelector('.popup__close-button');


//Card List

const list = document.querySelector('.gallery__grid');


//Input Validation

const editFormValidator = new FormValidator(defaultConfig, editProfileModalWindow);
const addCardFormValidator = new FormValidator(defaultConfig, addCardModalWindow);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();


//Function Definitions

function fillDefaultEditProfileValues() {
  if (!editProfileModalWindow.classList.contains("popup_opened")) {
    inputName.value = profileName.textContent;
    inputAboutme.value = profileAboutme.textContent;
  }  
}

function fillDefaultCardModalValues() {
  if(!addCardModalWindow.classList.contains("popup_opened")) {
    inputTitle.value = "";
    inputLink.value = "";
    }    
}

function fillProfileValues(event) {
  event.preventDefault();       
  profileName.textContent = inputName.value;
  profileAboutme.textContent = inputAboutme.value;        
  togglePopup(editProfileModalWindow);
}

function fillCardValues(event) {
  event.preventDefault();
  const tempObject = {};
  tempObject.name = inputTitle.value;
  tempObject.link = inputLink.value;

  list.prepend(new Card(tempObject, '.card-template').renderNewCard());
  togglePopup(addCardModalWindow);
}

initialCards.forEach((data) => list.prepend(new Card(data, '.card-template').renderNewCard()));


//Edit Profile Modal Events

editButton.addEventListener('click', ()=> {  
  fillDefaultEditProfileValues();
  togglePopup(editProfileModalWindow);
});

closeProfileButton.addEventListener('click', ()=> {
  fillDefaultEditProfileValues();
  togglePopup(editProfileModalWindow);
});

editProfileModalWindow.addEventListener('submit', fillProfileValues);


//Add Card Modal Events

addButton.addEventListener('click', () => {
  fillDefaultCardModalValues();
  saveButtonDisabled(addCardModalWindow);
  togglePopup(addCardModalWindow);
});

closeCardButton.addEventListener('click', ()=> {
  fillDefaultCardModalValues();
  togglePopup(addCardModalWindow);
});

addCardModalWindow.addEventListener('submit', fillCardValues);


//Image Modal Event

closeImageButton.addEventListener('click', ()=> {
  togglePopup(imageModalWindow);
});