import {saveButtonDisabled} from './utils.js';

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showErrorMessage(input) {
    const error = document.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;

    error.classList.add(this._settings.errorClass);
    input.classList.add(this._settings.inputErrorClass);
  }

  _hideErrorMessage(input) {
    const error = document.querySelector(`#${input.id}-error`);
  
    error.textContent = input.validationMessage;

    error.classList.remove(this._settings.errorClass);
    input.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(input) {
    if(input.validity.valid) {
      this._hideErrorMessage(input);
    } else {
      this._showErrorMessage(input);
    }
  }

  _toggleButtonState(inputs, button) {
    const isValid = inputs.every(input => input.validity.valid);
        
    if(isValid) {          
      button.disabled = false;     
      button.classList.remove(this._settings.inactiveButtonClass);
    } else {
      button.disabled = true;
      saveButtonDisabled(this._formElement);
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', ((e) => {
      e.preventDefault();
    }))

    const inputs = [...this._formElement.querySelectorAll(this._settings.inputSelector)];
    const button = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', ()=> {
        this._checkInputValidity(input);                
        this._toggleButtonState(inputs, button);
      })
    })
  }
}

export default FormValidator;