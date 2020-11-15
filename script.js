//Modals
const addCardPopup = document.querySelector('.popup_type_add-card');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const openImagePopup = document.querySelector('.popup_type_image');

//Open Buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__post-button');

//Close Buttons
const closeProfileButton = editProfilePopup.querySelector('.popup__close-button');
const closeCardButton = addCardPopup.querySelector('.popup__close-button');
const closeImageButton = openImagePopup.querySelector('.popup__close-button');

//Forms
//const form = document.querySelector('.popup__form');
const addForm = addCardPopup.querySelector('.popup__add-form');
const editForm = editProfilePopup.querySelector('.popup__edit-form');

//Profile Fields
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-me');

//Profile Inputs
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_about');

//Card Inputs
const titleInput = addForm.querySelector('.popup__input_type_card-title');
const imageInput = addForm.querySelector('.popup__input_type_url');

//Toggle Function
function togglePopup(modal) {
  modal.classList.toggle('popup_opened');
}

//Edit Profile Button
editProfileButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});

//Save Profile
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  togglePopup(editProfilePopup);
});

//Close Profile Button
closeProfileButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});

//Add New Card Button
addCardButton.addEventListener('click', () => {
    togglePopup(addCardPopup);
});

//Save New Card
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addCard({name: titleInput.value, link: imageInput.value});
  togglePopup(addCardPopup);
  });

//Close New Card Button
closeCardButton.addEventListener('click', e => {
  togglePopup(addCardPopup);
});


//Initial Card Array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
]; 

//Display Cards
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const list = document.querySelector('.gallery__grid');

//Populate Card Function
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  //Card Like Button
  cardLikeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_selected');
  });

  //Card Delete Button
  cardDeleteButton.addEventListener('click', (event) => {
    event.target.closest('.card').remove();
  });

  //Set Card Attributes
  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);

  //Open Card Image
  cardImage.addEventListener('click', () => {
    const popupImage = openImagePopup.querySelector('.popup__image');
    const popupImageTitle = openImagePopup.querySelector('.popup__image-title');
    togglePopup(openImagePopup);
    popupImage.src = card.link;
    popupImageTitle.textContent = card.name;
  });
 
  return cardElement;
};

//Add Card Function
function addCard (card) {
  const cardElement = createCard(card);
  list.prepend(cardElement);
};

//Display Initial Cards
initialCards.forEach(card => {
  addCard(card);
});

//Close Card Image
closeImageButton.addEventListener('click', e => {
  togglePopup(openImagePopup);
});