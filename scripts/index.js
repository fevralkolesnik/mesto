import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {selectors, initialCards,
  popupEditProfileNameInput, popupEditProfileDescriptionInput,
  popupFormEditProfile, popupFormAddCard,
  buttonEdit, buttonAddCard } from './constants.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

function createCard (item) {
  const newCard = new Card({
    link: item.link,
    name: item.name,
    handleCardClick: (link, name) => {
      popupImageView.open(link, name);
    }
  }).generateCard();

  return newCard;
}

const section = new Section ({
  items: initialCards,
  renderer: (card) => {
    section.addItem(createCard(card));
  }
}, selectors.cardsConteiner);
section.renderItems();

const userInfo = new UserInfo (selectors.profileName, selectors.profileDescription);

const popupEditProfile = new PopupWithForm ( {
  popupSelector: selectors.popupEditProfile,
  submitForm: (elements) => {
    userInfo.setUserInfo(elements[0].value, elements[1].value);

    popupEditProfile.close();

    profileValidation.toggleButtonState();
  }
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm ( {
  popupSelector: selectors.popupAddCard,
  submitForm: (elements) => {
    const card = {
      name: elements[0].value,
      link: elements[1].value
    }

    section.addItem(createCard(card));

    popupAddCard.close();

    newCardValidation.toggleButtonState();
  }
});
popupAddCard.setEventListeners();

const popupImageView = new PopupWithImage (selectors.popupImageView);
popupImageView.setEventListeners();



buttonEdit.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  popupEditProfileNameInput.value = getUserInfo.name;
  popupEditProfileDescriptionInput.value = getUserInfo.description;

  popupEditProfile.open();
});
buttonAddCard.addEventListener('click', () => popupAddCard.open());



const profileValidation = new FormValidator(selectors, popupFormEditProfile);
const newCardValidation = new FormValidator(selectors, popupFormAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();




