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
  popupEditProfile: '.popup_type_edit-profile',
  popupAddCard: '.popup_type_add-card',
  popupImageView: '.popup_type_image-view',
  popupCloseButtonEditProfile: '.popup__close-button_type_edit-profile',
  popupCloseButtonAddCard: '.popup__close-button_type_add-card',
  popupCloseButtonImageView: '.popup__close-button_type_image-view',
  formEditProfile: '.popup__form_type_edit-profile',
  formAddCard: '.popup__form_type_add-card',
  formInputName: '.popup__input_type_name',
  formInputDescription: '.popup__input_type_description',
  formInputImageLink: '.popup__input_type_image',
  formInputPlaceName: '.popup__input_type_place',
  cardsConteiner: '.elements',
  cardTemplate: '#element',
  card: '.element',
  cardName: '.element__name',
  cardImage: '.element__image',
  cardButtonLike: '.element__like',
  cardButtonDelete: '.element__delete-button',
  buttonEdit: '.profile__edit-button',
  buttonAddCard: '.profile__add-button',
  popupImageLink: '.popup__image',
  popupImageName: '.popup__image-name'
}

const content = document.querySelector(selectors.content);
const profileName = content.querySelector(selectors.profileName);
const profileDescription = content.querySelector(selectors.profileDescription);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const popupImageView = document.querySelector(selectors.popupImageView);

const popupCloseButtonEditProfile = popupEditProfile.querySelector(selectors.popupCloseButtonEditProfile);
const popupCloseButtonAddCard = popupAddCard.querySelector(selectors.popupCloseButtonAddCard);
const popupCloseButtonImageView = popupImageView.querySelector(selectors.popupCloseButtonImageView);
const formEditProfile = content.querySelector(selectors.editForm);
const formAddCard = content.querySelector(selectors.addCardForm);
const formInputName = document.querySelector(selectors.formInputName);
const formInputDescription = document.querySelector(selectors.formInputDescription);
const formInputPlaceName = popupAddCard.querySelector(selectors.formInputPlaceName);
const formInputImageLink = popupAddCard.querySelector(selectors.formInputImageLink);

const cardsConteiner = document.querySelector(selectors.cardsConteiner);
const cardTemplate = document.querySelector(selectors.cardTemplate).content;

const buttonEdit = content.querySelector(selectors.buttonEdit);
const buttonAddCard = content.querySelector(selectors.buttonAddCard);

const popupImageLink = popupImageView.querySelector(selectors.popupImageLink);
const popupImageName = popupImageView.querySelector(selectors.popupImageName);


function editPopup () {
  formInputName.value = profileName.textContent;
  formInputDescription.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function addCardPopup () {
  openPopup(popupAddCard);
}

function showImagePopup (link, name) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;

  openPopup(popupImageView);
}



function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}



buttonEdit.addEventListener('click', editPopup);
buttonAddCard.addEventListener('click', addCardPopup);
popupCloseButtonEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseButtonAddCard.addEventListener('click', () => closePopup(popupAddCard));
popupCloseButtonImageView.addEventListener('click', () => closePopup(popupImageView));


function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = formInputName.value;
  profileDescription.textContent = formInputDescription.value;

  closePopup(popupEditProfile);
}
editForm.addEventListener('submit', editProfile);

function addCard(evt) {
  evt.preventDefault();

  if (!formInputPlaceName.value || !formInputImageLink.value) {
    alert('Нельзя вставить пустую карточку');

    return 0;
  }

  const card = {
    name: formInputPlaceName.value,
    link: formInputImageLink.value
  }

  renderCard(card);

  formInputPlaceName.value = '';
  formInputImageLink.value = '';

  closePopup(popupAddCard);
}
addCardForm.addEventListener('submit', addCard);


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
