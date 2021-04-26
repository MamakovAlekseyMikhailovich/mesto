let profileName = document.querySelector(".profile__title");
let profileAbout = document.querySelector(".profile__subtitle");
let openPopupButton = document.querySelector (".profile__edit-button");

let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");
let formProfile = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let aboutInput = document.querySelector(".popup__input_type_about");

function openPopup () {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popup.classList.add ("popup_opened");
}

function closePopup () {
    popup.classList.remove ("popup_opened");
}
  
function submitPopup (event) {
    event.preventDefault();
  
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup();
}

openPopupButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
formProfile.addEventListener("submit", submitPopup);
