export function togglePopup(modal) {  
  if(!modal.classList.contains('popup_opened')) { 
    modal.addEventListener('click', closeModalOutside); 
    window.addEventListener('keydown', escCloseModal); 
  } 
  else { 
    modal.removeEventListener('click', closeModalOutside); 
    window.removeEventListener('keydown', escCloseModal); 
  }  
  modal.classList.toggle('popup_opened');    
}

export function closeModalOutside(event) { 
  togglePopup(event.target);
} 
 
export function escCloseModal(event) { 
  if (event.key === 'Escape') { 
    const openModal = document.querySelector('.popup_opened'); 
    togglePopup(openModal); 
  } 
}

/* NOTE TO REVIEWER: The ESC works great until I save one of the forms, 
then ESC stops working for the Image modals only.  Could you nudge me in 
the right direction to address this? */

export function saveButtonDisabled(modal) {
  const inactiveButton = modal.querySelector('.popup__save-button');
  inactiveButton.classList.add('popup__save-button_disabled');
}