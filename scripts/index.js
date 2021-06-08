import { initialCards, Card } from "./Card.js";
import { config, FormValidator } from "./FormValidator.js";
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");
const popupEditForm = document.querySelector("#popupEditForm");
const popupAddForm = document.querySelector("#popupAddForm");
const elementsList = document.querySelector(".elements__list");
const validateAdd = new FormValidator(config, popupAddForm);
const validateEdit = new FormValidator(config, popupEditForm);

function addCard(data, expand) {
  const card = new Card(data, "#elements-template");
  const cardElement = card.generateCard();
  expand.prepend(cardElement);
}

initialCards.reverse().forEach((item) => {
  addCard(item, elementsList);
});

validateAdd.enableValidation();
validateEdit.enableValidation();

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
}

function handleCardFormSubmit(event) {
  event.preventDefault();
  addCard({name: placeInput.value,link: linkInput.value},elementsList);
  popupAddForm.reset();
  closePopup(popupAdd);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
  document.addEventListener("click", closePopupOverlay);
}

function openPopupEdit() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  validateEdit.deleteErrors();
  openPopup(popupEdit);
}

function closePopupEscape(evt) {
  // const popupActive = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

function closePopupOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
  document.removeEventListener("click", closePopupOverlay);
}

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", () => {
  openPopup(popupAdd);
  validateAdd.deleteErrors();
});

popupEditForm.addEventListener("submit", handleProfileFormSubmit);
popupAddForm.addEventListener("submit", handleCardFormSubmit);