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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Карточки -->
initialCards.forEach(function (element) {
    const cardsElement = elementsTemplate.cloneNode(true);
    cardsElement.querySelector(".elements__title").textContent = element.name;
    cardsElement.querySelector(".elements__photo").src = element.link; 
    cardsElement.querySelector(".elements__photo").addEventListener("click", function () {
        openPopupImage(element.link, element.name);
  });

    const deleteCard = cardsElement.querySelector(".elements__delete");
    deleteCard.addEventListener("click", function (event) {
        event.target.closest(".elements__item").remove();
  });

    cardsElement.querySelector(".elements__like").addEventListener("click", function (event) {
        event.target.classList.toggle("elements__like");
        event.target.classList.toggle("elements__like_active");
  });
    
    elementsList.append(cardsElement);
});

// Открытие Popup --->
function openPopupEdit() {
    popupEdit.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
};

function openPopupAdd() {
    popupAdd.classList.add("popup_opened");
};

function openPopupImage(image, caption) {
    popupImage.classList.add("popup_opened");
    imagePopup.src = image;
    captionPopup.textContent = caption; 
};

//Закрытие Popup -->
function closePopup() {
    popupEdit.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    popupImage.classList.remove("popup_opened")
};
// Сохранение профиля -->
function submitEditPopup(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup();
};

//Добавление карточки -->
function addCard(placeValue, linkValue) {
    const placeTemplate = document.querySelector("#elements-template").content;
    const cardElement = placeTemplate.querySelector(".elements__item").cloneNode(true);
  
    cardElement.querySelector(".elements__title").textContent = placeValue;
    cardElement.querySelector(".elements__photo").src = linkValue;

    cardElement.querySelector(".elements__photo").addEventListener("click", function () {
        openPopupImage(linkValue, placeValue);
    })

    const deleteCard = cardElement.querySelector(".elements__delete");
    deleteCard.addEventListener("click", function (event) {
        event.target.closest(".elements__item").remove();
    });

    cardElement.querySelector(".elements__like").addEventListener("click", function (event) {
      event.target.classList.toggle("elements__like");
      event.target.classList.toggle("elements__like_active");
  }); 

    elementsList.prepend(cardElement);
}
//Вызов -->
editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
closeEditButton.addEventListener("click", closePopup);
closeAddButton.addEventListener("click", closePopup);
closeImgButton.addEventListener("click", closePopup);
popupEditForm.addEventListener("submit", submitEditPopup);
popupAddForm.addEventListener("submit", function addItem(event) {
      event.preventDefault();
      addCard(placeInput.value, linkInput.value); 
      closePopup();
  });
