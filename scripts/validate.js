const showInputError = (formElement, inputElement, errorMessage) => {
    const { inputErrorClass,  errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass); 
};

const hideInputError = (formElement, inputElement) => {
    const { inputErrorClass,  errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = ''; 
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement, config);    }
};
const hasInvalidInput = (inputList) => { 
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
};

const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, restConfig);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    // const { inactiveButtonClass } = config;
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      // buttonElement.classList.add(inactiveButtonClass);
    } else {
      // buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
};

const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, restConfig);
    });
};