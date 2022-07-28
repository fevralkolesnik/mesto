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
  editForm: '.popup__form_type_edit-profile',
  addCardForm: '.popup__form_type_add-card',
  inputName: '.popup__input_type_name',
  inputDescription: '.popup__input_type_description',
  inputImage: '.popup__input_type_image',
  inputPlaceName: '.popup__input_type_place',
  cardsConteiner: '.elements',
  cardTemplate: '#element',
  card: '.element',
  cardName: '.element__name',
  cardImage: '.element__image',
  cardButtonLike: '.element__like',
  cardButtonDelete: '.element__delete-button',
  editButton: '.profile__edit-button',
  addCardButton: '.profile__add-button',
  popupImageLink: '.popup__image',
  popupImageName: '.popup__image-name'
}

const content = document.querySelector(selectors.content);
const profileName = content.querySelector(selectors.profileName);
const profileDescription = content.querySelector(selectors.profileDescription);
const popupEditProfile = content.querySelector(selectors.popupEditProfile);
const popupAddCard = content.querySelector(selectors.popupAddCard);
const popupImageView = content.querySelector(selectors.popupImageView);

const popupCloseButtonEditProfile = popupEditProfile.querySelector(selectors.popupCloseButtonEditProfile);
const popupCloseButtonAddCard = popupAddCard.querySelector(selectors.popupCloseButtonAddCard);
const popupCloseButtonImageView = popupImageView.querySelector(selectors.popupCloseButtonImageView);
const editForm = content.querySelector(selectors.editForm);
const addCardForm = content.querySelector(selectors.addCardForm);
let inputName = content.querySelector(selectors.inputName);
let inputDescription = content.querySelector(selectors.inputDescription);

const cardsConteiner = content.querySelector(selectors.cardsConteiner);
const cardTemplate = document.querySelector(selectors.cardTemplate).content;

const editButton = content.querySelector(selectors.editButton);
const addCardButton = content.querySelector(selectors.addCardButton);


function popupEdit () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function popupAdd () {
  openPopup(popupAddCard);
}

function popupImage (link, name) {
  const popupImageLink = popupImageView.querySelector(selectors.popupImageLink);
  const popupImageName = popupImageView.querySelector(selectors.popupImageName);

  popupImageLink.src = link;
  popupImageName.textContent = name;

  openPopup(popupAddCard);
}



function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}



editButton.addEventListener('click', popupEdit);
addCardButton.addEventListener('click', popupAdd);
popupCloseButtonEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseButtonAddCard.addEventListener('click', () => closePopup(popupAddCard));
popupCloseButtonImageView.addEventListener('click', () => closePopup(popupImageView));


function editProfile(evt) {
  evt.preventDefault();

  inputName = document.querySelector(selectors.inputName);
  inputDescription = document.querySelector(selectors.inputDescription);

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupEditProfile);
}
editForm.addEventListener('submit', editProfile);

function addCard(evt) {
  evt.preventDefault();

  const inputPlaceName = popupAddCard.querySelector(selectors.inputPlaceName);
  const inputImage = popupAddCard.querySelector(selectors.inputImage);
  let card = {
    name: inputPlaceName.value,
    link: inputImage.value
  }

  renderCard(card);

  inputPlaceName.value = '';
  inputImage.value = '';

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
    popupImage(link, name);
  });

  return card;
}

function renderCard (item) {
  let newCard = createCard(item.link, item.name);
  cardsConteiner.prepend(newCard);
}


function addInitialCard() {
  initialCards.forEach(renderCard);
}

addInitialCard();
