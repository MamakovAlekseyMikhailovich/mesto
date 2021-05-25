const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const popupImage = document.querySelector("#popupImg");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const closeEditButton = document.querySelector("#closeEditButton");
const closeAddButton = document.querySelector("#closeAddButton");
const closeImgButton = document.querySelector("#closeImgButton");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");
const namePlace = document.querySelector(".elements__title");
const popupEditForm = document.querySelector("#popupEditForm");
const popupAddForm = document.querySelector("#popupAddForm");
const elementsList = document.querySelector(".elements__list");
const elementsTemplate = document.querySelector("#elements-template").content;
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");
const config = { 
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    // inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

//Общие функции для popup
function openPopup(popup) {
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEscape);
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEscape);
    popup.classList.remove("popup_opened");
}

function findOpenedPopup () {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
}

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
    findOpenedPopup();
    }
}

function closePopupEscape(evt) {
    if (evt.key === 'Escape') {
    findOpenedPopup();
    }
}

//Редактирование профиля -->
function openPopupEdit() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openPopup(popupEdit);
}

function closePopupEdit() {
    closePopup(popupEdit);
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopupEdit();
    popupEditForm.reset();
}

//Редактирование карточек -->
function openPopupAdd () {
    document.getElementById('popupAddSave').disabled = true;
    openPopup(popupAdd);
}

function closePopupAdd () {
    closePopup(popupAdd);
}

function handleCardFormSubmit (event) {
    event.preventDefault();
    const newCard = createCard({ name: placeInput.value, link: linkInput.value});
    elementsList.prepend(newCard);
    closePopupAdd();
    popupAddForm.reset();
}

//Открытие картинки -->

function openPopupImage(image, caption) {
    popupImage.classList.add("popup_opened");
    imagePopup.src = image;
    imagePopup.alt = caption;
    captionPopup.textContent = caption; 
}

function closePopupImage () {
    closePopup(popupImage);
}

// Карточки -->
initialCards.forEach(function (element) {
    elementsList.append(createCard(element)); 
})

function createCard(element) {
    const cardsElement = elementsTemplate.cloneNode(true);
    const elementsPhoto = cardsElement.querySelector(".elements__photo");
    cardsElement.querySelector(".elements__title").textContent = element.name; 
    elementsPhoto.src = element.link;
    elementsPhoto.alt = element.name;
    elementsPhoto.addEventListener("click", function () { 
        openPopupImage(element.link, element.name); 
    }); 
 
    const deleteCard = cardsElement.querySelector(".elements__delete"); 
    deleteCard.addEventListener("click", function (event) { 
        event.target.closest(".elements__item").remove(); 
    }); 
 
    cardsElement.querySelector(".elements__like").addEventListener("click", function (event) { 
        event.target.classList.toggle("elements__like_active"); 
    }); 
     
    return cardsElement; 
}; 

//Вызов -->
editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
closeEditButton.addEventListener("click", closePopupEdit);
closeAddButton.addEventListener("click", closePopupAdd);
closeImgButton.addEventListener("click", closePopupImage);
popupEditForm.addEventListener("submit", handleProfileFormSubmit);
popupAddForm.addEventListener("submit", handleCardFormSubmit);

enableValidation(config);