const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  class FormValidator {
    constructor(data, formElement) {
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
      this._formElement = formElement;
    }
  
    _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = errorMessage;
    };
  
    _hideInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };

    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    deleteErrors() {
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      const buttonElement = this._formElement.querySelector(
        this._submitButtonSelector
      );
      inputList.forEach((inputElement) => {
        if (!inputElement.value) {
          this._hideInputError(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        } else {
          this._checkInputValidity(inputElement);
        }
      });
    }
 
    _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    _toggleButtonState = (inputList, buttonElement) => {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", true);
      } else {
        buttonElement.removeAttribute("disabled");
      }
    };
  
    _setEventListeners = () => {
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      const buttonElement = this._formElement.querySelector(
        this._submitButtonSelector
      );
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };
  
    enableValidation = () => {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    };
  }
  
  export { config, FormValidator };