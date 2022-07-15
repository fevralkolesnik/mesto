let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = popup.querySelector('.popup__input_type_name');
let inputDescription = popup.querySelector('.popup__input_type_description');

let editForm = content.querySelector('.popup__form');

function openEditProfile() {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closeEditProfile() {
  popup.classList.remove('popup_opened');
}

function editProfile(event) {
  event.preventDefault();

  inputName = document.querySelector('.popup__input_type_name');
  inputDescription = document.querySelector('.popup__input_type_description');

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeEditProfile();
}

editButton.addEventListener('click', openEditProfile);
popupCloseButton.addEventListener('click', closeEditProfile);
editForm.addEventListener('submit', editProfile);


