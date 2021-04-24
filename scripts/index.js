let openPopupButton = document.querySelector (".profile__button_edit");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__button_close");
let formProfile = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let aboutInput = document.querySelector(".popup__input_about");
let profileName = document.querySelector(".profile__title");
let profileAbout = document.querySelector(".profile__subtitle");


function togglePopupEditbutton(evt) {
    evt.preventDefault();
    popup.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    togglePopupEditbutton(evt);
}

openPopupButton.addEventListener("click", togglePopupEditbutton);
closePopupButton.addEventListener("click", togglePopupEditbutton);
formProfile.addEventListener("submit", editProfile);