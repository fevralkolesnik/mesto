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
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  buttonEdit: '.profile__edit-button',
  popupEditProfile: '.popup_type_edit-profile',
  formEditProfile: '.popup__form_type_edit-profile',
  formInputName: '.popup__input_type_name',
  formInputDescription: '.popup__input_type_description',
  popupCloseButtonEditProfile: '.popup__close-button_type_edit-profile',
  buttonAddCard: '.profile__add-button',
  popupAddCard: '.popup_type_add-card',
  formAddCard: '.popup__form_type_add-card',
  formInputPlaceName: '.popup__input_type_place',
  formInputImageLink: '.popup__input_type_image',
  popupCloseButtonAddCard: '.popup__close-button_type_add-card',
  popupImageView: '.popup_type_image-view',
  popupImageLink: '.popup__image',
  popupImageName: '.popup__image-name',
  popupCloseButtonImageView: '.popup__close-button_type_image-view',
  cardsConteiner: '.elements',
  cardTemplate: '#element',
  card: '.element',
  cardName: '.element__name',
  cardImage: '.element__image',
  cardButtonLike: '.element__like',
  cardButtonDelete: '.element__delete-button',
}

const content = document.querySelector(selectors.content);

const profileName = content.querySelector(selectors.profileName);
const profileDescription = content.querySelector(selectors.profileDescription);

const buttonEdit = content.querySelector(selectors.buttonEdit);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const formEditProfile = popupEditProfile.querySelector(selectors.formEditProfile);
const formInputName = formEditProfile.querySelector(selectors.formInputName);
const formInputDescription = formEditProfile.querySelector(selectors.formInputDescription);
const popupCloseButtonEditProfile = popupEditProfile.querySelector(selectors.popupCloseButtonEditProfile);

const buttonAddCard = content.querySelector(selectors.buttonAddCard);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const formAddCard = popupAddCard.querySelector(selectors.formAddCard);
const formInputPlaceName = formAddCard.querySelector(selectors.formInputPlaceName);
const formInputImageLink = formAddCard.querySelector(selectors.formInputImageLink);
const popupCloseButtonAddCard = popupAddCard.querySelector(selectors.popupCloseButtonAddCard);

const popupImageView = document.querySelector(selectors.popupImageView);
const popupImageLink = popupImageView.querySelector(selectors.popupImageLink);
const popupImageName = popupImageView.querySelector(selectors.popupImageName);
const popupCloseButtonImageView = popupImageView.querySelector(selectors.popupCloseButtonImageView);

const cardsConteiner = document.querySelector(selectors.cardsConteiner);
const cardTemplate = document.querySelector(selectors.cardTemplate).content;



function editPopup () {
  formInputName.value = profileName.textContent;
  formInputDescription.value = profileDescription.textContent;

  openPopup(popupEditProfile);
  closePopupEsc(popupEditProfile);
}

function addCardPopup () {
  openPopup(popupAddCard);
  closePopupEsc(popupAddCard);
}

function showImagePopup (link, name) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;

  openPopup(popupImageView);
  closePopupEsc(popupImageView);
}



function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');

}

function closePopupEsc (popupName) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popupName);
    }
  });
}

function closePopupOverlay (evt, popupName) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupName);
  }
}



buttonEdit.addEventListener('click', editPopup);
buttonAddCard.addEventListener('click', addCardPopup);

popupCloseButtonEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseButtonAddCard.addEventListener('click', () => closePopup(popupAddCard));
popupCloseButtonImageView.addEventListener('click', () => closePopup(popupImageView));

popupEditProfile.addEventListener('click', (evt) => closePopupOverlay(evt, popupEditProfile));
popupAddCard.addEventListener('click', (evt) => closePopupOverlay(evt, popupAddCard));
popupImageView.addEventListener('click', (evt) => closePopupOverlay(evt, popupImageView));


function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = formInputName.value;
  profileDescription.textContent = formInputDescription.value;

  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', editProfile);

function addCard(evt) {
  evt.preventDefault();

  const card = {
    name: formInputPlaceName.value,
    link: formInputImageLink.value
  }

  renderCard(card);

  formInputPlaceName.value = '';
  formInputImageLink.value = '';

  closePopup(popupAddCard);
}
formAddCard.addEventListener('submit', addCard);


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


function addInitialCard() {
  initialCards.forEach(renderCard);
}

addInitialCard();
