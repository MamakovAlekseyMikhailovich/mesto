import { openPopup } from "./index.js";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__photo").src = `${this._link}`;
    this._element.querySelector(".elements__photo").alt = this._name;

    return this._element;
  }

  _openPopupImage(image, caption) {
    const imagePopup = document.querySelector(".popup__image");
    const captionPopup = document.querySelector(".popup__caption");
    const popupImage = document.querySelector("#popupImg");

    openPopup(popupImage);
    imagePopup.src = image;
    imagePopup.alt = caption;
    captionPopup.textContent = caption;
  }
  _toggleLike (evt) {
    evt.target.classList.toggle("elements__like_active")
  }
  _deleteCard (evt) {
    evt.target.closest(".elements__item").remove()
  }
  
  _setEventListeners() {
    this._element
      .querySelector(".elements__photo")
      .addEventListener("click", () => {
        this._openPopupImage(this._link, this._name);
      });

    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {this._deleteCard});
      // (evt) => {evt.target.closest(".elements__item").remove();});

    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {this._toggleLike});
      // (evt) => {evt.target.classList.toggle("elements__like_active");
      // });
  }
}

export { initialCards, Card };