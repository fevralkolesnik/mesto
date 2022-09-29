import './index.css'

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {selectors, initialCards,
  popupFormEditProfile, popupFormAddCard,
  buttonEdit, buttonAddCard } from '../components/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

function createCard (item) {
  const newCard = new Card({
    link: item.link,
    name: item.name,
    selectors: selectors,
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
    userInfo.setUserInfo(elements.name, elements.description);

    popupEditProfile.close();

    profileValidation.toggleButtonState();
  }
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm ( {
  popupSelector: selectors.popupAddCard,
  submitForm: (elements) => {
    const card = {
      name: elements.name,
      link: elements.link
    }

    section.addItem(createCard(card));

    popupAddCard.close();

    newCardValidation.toggleButtonState();
  }
});
popupAddCard.setEventListeners();

const popupImageView = new PopupWithImage (selectors.popupImageView, selectors.popupImageLink, selectors.popupImageName);
popupImageView.setEventListeners();



buttonEdit.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(getUserInfo);

  popupEditProfile.open();
});
buttonAddCard.addEventListener('click', () => popupAddCard.open());



const profileValidation = new FormValidator(selectors, popupFormEditProfile);
const newCardValidation = new FormValidator(selectors, popupFormAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();




