let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = popup.querySelector('.input__text_type_name');
let inputDescription = popup.querySelector('.input__text_type_description');
let submitBatton = popup.querySelector('.form__submit-button');

function openEditProfile() {
  popup.classList.remove('popup_disabled');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closeEditProfile() {
  popup.classList.add('popup_disabled');
}

function editProfile() {
  inputName = document.querySelector('.input__text_type_name');
  inputDescription = document.querySelector('.input__text_type_description');

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeEditProfile();
}

editButton.addEventListener('click', openEditProfile);
popupCloseButton.addEventListener('click', closeEditProfile);
submitBatton.addEventListener('click', editProfile);


