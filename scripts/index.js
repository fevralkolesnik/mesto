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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorActive: 'popup__input-error_active'
});

const selectors = {
  content: '.content',
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
  popupCloseButton: '.popup__close-button',
  popupSubmitButton: '.popup__submit-button',
  cardsConteiner: '.elements',
  cardTemplate: '#template-element',
  card: '.element',
  cardName: '.element__name',
  cardImage: '.element__image',
  cardButtonLike: '.element__like',
  cardButtonDelete: '.element__delete-button',

  Esc: 'Escape',
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
const cardTemplate = document.querySelector(selectors.cardTemplate).content;



function openEditPopup () {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
  addEscListener(popupEditProfile);
}

function openAddCardPopup () {
  openPopup(popupAddCard);
  addEscListener(popupAddCard);
}

function showImagePopup (link, name) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;

  openPopup(popupImageView);
  addEscListener(popupImageView);
}



function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  addEscListener();
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  removeEscListener();
}


function closePopupOnEsc (evt) {
  if (evt.key === selectors.Esc) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function addEscListener () {
  document.addEventListener('keydown', closePopupOnEsc);
}

function removeEscListener () {
  document.removeEventListener('keydown', closePopupOnEsc);
}


function closePopupOnClick (evt, popupName) {
  const closeButton = popupName.querySelector(selectors.popupCloseButton);
  if (evt.target === evt.currentTarget || evt.target === closeButton) {
    closePopup(popupName);
  }
}



buttonEdit.addEventListener('click', openEditPopup);
buttonAddCard.addEventListener('click', openAddCardPopup);

popupEditProfile.addEventListener('click', (evt) => closePopupOnClick(evt, popupEditProfile));
popupAddCard.addEventListener('click', (evt) => closePopupOnClick(evt, popupAddCard));
popupImageView.addEventListener('click', (evt) => closePopupOnClick(evt, popupImageView));


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

  const buttonSubmit = popupFormAddCard.querySelector(selectors.popupSubmitButton);

  buttonSubmit.classList.add('popup__submit-button_disabled');
  buttonSubmit.setAttribute('disabled', true);

  closePopup(popupAddCard);
}
popupFormAddCard.addEventListener('submit', addCard);


function createCard(link, name) {
  const card = cardTemplate.querySelector(selectors.card).cloneNode(true);

  const cardName = card.querySelector(selectors.cardName)
  const cardImage = card.querySelector(selectors.cardImage);
  const cardButtonLike = card.querySelector(selectors.cardButtonLike);
  const cardButtonDelete = card.querySelector(selectors.cardButtonDelete);

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardButtonLike.addEventListener('click', () => cardButtonLike.classList.toggle('element__like_active'));
  cardButtonDelete.addEventListener('click', () => card.remove());
  cardImage.addEventListener('click', () => {
    showImagePopup(link, name);
  });

  return card;
}

function renderCard (item) {
  const newCard = createCard(item.link, item.name);
  cardsConteiner.prepend(newCard);
}


function addInitialCards() {
  initialCards.forEach(renderCard);
}

addInitialCards();
