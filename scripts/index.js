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
const addForm = addCardPopup.querySelector('.popup__add-form');
const editForm = editProfilePopup.querySelector('.popup__edit-form');

//Profile Fields
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-me');

//Profile Inputs
const nameInput = editForm.querySelector('.popup__input_type_name');
const aboutInput = editForm.querySelector('.popup__input_type_about');

//Card Fields
const popupImage = openImagePopup.querySelector('.popup__image');
const popupImageTitle = openImagePopup.querySelector('.popup__image-title');

//Card Inputs
const titleInput = addForm.querySelector('.popup__input_type_card-title');
const imageInput = addForm.querySelector('.popup__input_type_url');

//Modal Toggle Function
function togglePopup(modal) {
  if (!modal.classList.contains('popup_opened')) {
    modal.addEventListener('click', overlayClose);
    document.addEventListener('keydown', escKeyClose);
  } else {
    modal.removeEventListener('click', overlayClose);
    document.removeEventListener('keydown', escKeyClose);
  }
  modal.classList.toggle('popup_opened');
}

//Close Modal with Escape
function escKeyClose(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector('.popup_opened');
    togglePopup(activeModal);
  }
}

//Close Modal from Overlay
function overlayClose(evt) {
  togglePopup(evt.target);
}

//Edit Profile Button
editProfileButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});

//Submit Profile Button
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  togglePopup(editProfilePopup);
});

//Close Profile Modal
closeProfileButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
});

//Add New Card Button
addCardButton.addEventListener('click', () => {
    togglePopup(addCardPopup);
});

//Submit New Card Button
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addCard({name: titleInput.value, link: imageInput.value});
  togglePopup(addCardPopup);
  addForm.reset();
});

//Close New Card Modal
closeCardButton.addEventListener('click', e => {
  togglePopup(addCardPopup);
});

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
  function toggleCardLike (event) {
    event.target.classList.toggle('card__like-button_selected');
  }
  cardLikeButton.addEventListener('click', toggleCardLike);


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
    togglePopup(openImagePopup);
    popupImage.src = card.link;
    popupImageTitle.textContent = card.name;
  });
 
  return cardElement;
}

//Add Card Function
function addCard (card) {
  const cardElement = createCard(card);
  list.prepend(cardElement);
}

//Display Initial Cards
initialCards.forEach(card => {
  addCard(card);
});


//Close Card Image
closeImageButton.addEventListener('click', e => {
  togglePopup(openImagePopup);
});