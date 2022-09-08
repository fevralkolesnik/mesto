import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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

const selectors = {
  content: '.content',
  popup: '.popup',
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  buttonEdit: '.profile__edit-button',
  popupEditProfile: '.popup_type_edit-profile',
  popupFormEditProfile: '.popup__form_type_edit-profile',
  popupEditProfileNameInput: '.popup__input_type_name',
  popupEditProfileDescriptionInput: '.popup__input_type_description',
  buttonAddCard: '.profile__add-button',
  popupAddCard: '.popup_type_add-card',
  popupFormAddCard: '.popup__form_type_add-card',
  popupAddCardNameInput: '.popup__input_type_place',
  popupAddCardLinkInput: '.popup__input_type_image',
  popupImageView: '.popup_type_image-view',
  popupImageLink: '.popup__image',
  popupImageName: '.popup__image-name',
  popupCloseButton: 'popup__close-button',
  popupSubmitButton: '.popup__submit-button',
  cardsConteiner: '.elements',
  cardTemplate: '#template-element',
  card: '.element',
  cardName: '.element__name',
  cardImage: '.element__image',
  cardButtonLike: '.element__like',
  cardButtonDelete: '.element__delete-button',

  Esc: 'Escape',

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorActive: 'popup__input-error_active'
}

const content = document.querySelector(selectors.content);

const profileName = content.querySelector(selectors.profileName);
const profileDescription = content.querySelector(selectors.profileDescription);

const buttonEdit = content.querySelector(selectors.buttonEdit);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupFormEditProfile = popupEditProfile.querySelector(selectors.popupFormEditProfile);
const popupEditProfileNameInput = popupFormEditProfile.querySelector(selectors.popupEditProfileNameInput);
const popupEditProfileDescriptionInput = popupFormEditProfile.querySelector(selectors.popupEditProfileDescriptionInput);

const buttonAddCard = content.querySelector(selectors.buttonAddCard);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const popupFormAddCard = popupAddCard.querySelector(selectors.popupFormAddCard);
const popupAddCardNameInput = popupFormAddCard.querySelector(selectors.popupAddCardNameInput);
const popupAddCardLinkInput = popupFormAddCard.querySelector(selectors.popupAddCardLinkInput);

const popupImageView = document.querySelector(selectors.popupImageView);
const popupImageLink = popupImageView.querySelector(selectors.popupImageLink);
const popupImageName = popupImageView.querySelector(selectors.popupImageName);

const cardsConteiner = document.querySelector(selectors.cardsConteiner);



function openEditPopup () {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function openAddCardPopup () {
  openPopup(popupAddCard);
}

function showImagePopup (link, name) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;

  openPopup(popupImageView);
}



function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc (evt) {
  if (evt.key === selectors.Esc) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}


function closePopupOnClick (evt, popupName) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains(selectors.popupCloseButton)) {
    closePopup(popupName);
  }
}



buttonEdit.addEventListener('click', openEditPopup);
buttonAddCard.addEventListener('click', openAddCardPopup);


document.querySelectorAll(selectors.popup).forEach(popup => {
  popup.addEventListener('click', (evt) => closePopupOnClick(evt, popup));
});


function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = popupEditProfileNameInput.value;
  profileDescription.textContent = popupEditProfileDescriptionInput.value;

  closePopup(popupEditProfile);
}
popupFormEditProfile.addEventListener('submit', editProfile);



function addCard(evt) {
  evt.preventDefault();

  const card = {
    name: popupAddCardNameInput.value,
    link: popupAddCardLinkInput.value
  }

  renderCard(card);

  popupFormAddCard.reset();

  newCardValidation.toggleButtonState();

  closePopup(popupAddCard);
}
popupFormAddCard.addEventListener('submit', addCard);


function createCard (item) {
  const newCard = new Card(item.link, item.name, selectors, showImagePopup).generateCard();

  return newCard;
}

function renderCard (item) {
  const newCardElement = createCard (item);
  cardsConteiner.prepend(newCardElement);
}


function addInitialCards() {
  initialCards.forEach(renderCard);
}
addInitialCards();


const profileValidation = new FormValidator(selectors, popupFormEditProfile);
const newCardValidation = new FormValidator(selectors, popupFormAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();
