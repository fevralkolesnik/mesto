import './index.css'

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {selectors,
  popupFormEditProfile, popupFormAddCard, popupFormSetAvatar,
  userAvatar, buttonEdit, buttonAddCard } from '../components/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

function handleWaiting (popupSelector, isWaiting) {
  const popup = document.querySelector(popupSelector);
  const button = popup.querySelector(selectors.submitButtonSelector);
  if (isWaiting) {
    button.textContent = `${button.textContent}...`;
  }
  else {
    button.textContent = button.textContent.substr(0, button.textContent.length - 3);
  }
}



function createCard (item) {
  const userID = userInfo.getId();
  const newCard = new Card({
    card: item,
    selectors: selectors,
    userID: userID,
    handleButtonLike: (card) => {
      if (!card._isMyLike()) {
        api.addLikeCard(item._id)
          .then ((data) => {
            card._setLike(data.likes.length);
          })
          .catch (err => {
            console.log(`Произошла ошибка: ${err}`);
          });
      }
      else {
        api.deleteLikeCard(item._id)
          .then ((data) => {
            card._setLike(data.likes.length);
          })
          .catch (err => {
            console.log(`Произошла ошибка: ${err}`);
          });
      }
    },
    handleButtonDelete: () => {
      popupDeleteCard.open(item._id, newCard);
    },
    handleCardClick: (link, name) => {
      popupImageView.open(link, name);
    }
  }).generateCard();


  return newCard;
}



const section = new Section ({
  renderer: (card) => {
    section.addInitialItems(createCard(card));
  }
}, selectors.cardsConteiner);



const userInfo = new UserInfo (selectors.profileName, selectors.profileDescription, selectors.profileImage);



const popupEditProfile = new PopupWithForm ( {
  popupSelector: selectors.popupEditProfile,
  submitForm: (newUserInfo) => {
    handleWaiting(selectors.popupEditProfile, true);
    api.editUserInfo(newUserInfo)
      .then(data => {
        userInfo.setUserInfo(data);

        popupEditProfile.close();

        profileValidation.toggleButtonState();
      })
      .catch (err => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally (() => {
        handleWaiting(selectors.popupEditProfile, false);
      })
  }
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm ( {
  popupSelector: selectors.popupAddCard,
  submitForm: (card) => {
    handleWaiting(selectors.popupAddCard, true);
    api.addNewCard(card)
      .then (data => {
        section.addItem(createCard(data));

        popupAddCard.close();

        newCardValidation.toggleButtonState();
      })
      .catch (err => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        handleWaiting(selectors.popupAddCard, false);
      })
  }
});
popupAddCard.setEventListeners();

const popupSetAvatar = new PopupWithForm ( {
  popupSelector: selectors.popupSetAvatar,
  submitForm: (avatar) => {
    handleWaiting(selectors.popupSetAvatar, true);
    api.setAvatar(avatar)
      .then (data => {
        userInfo.setAvatar (avatar.link);

        popupSetAvatar.close();

        setAvatarValidation.toggleButtonState();
      })
      .catch (err => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        handleWaiting(selectors.popupSetAvatar, false);
      })
  }
});
popupSetAvatar.setEventListeners();

const popupDeleteCard = new PopupWithSubmit ( {
  popupSelector: selectors.popupDeleteCard,
  submitForm: (cardId, cardNode) => {
    handleWaiting(selectors.popupDeleteCard, true);
    api.deleteCard(cardId)
      .then (() => {
        cardNode.remove();
        cardNode = null
        popupDeleteCard.close();
      })
      .catch (err => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        handleWaiting(selectors.popupDeleteCard, false);
      })
  }
});
popupDeleteCard.setEventListeners();

const popupImageView = new PopupWithImage (selectors.popupImageView, selectors.popupImageLink, selectors.popupImageName);
popupImageView.setEventListeners();



buttonEdit.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());

  popupEditProfile.open();
});
buttonAddCard.addEventListener('click', () => popupAddCard.open());
userAvatar.addEventListener('click', () => popupSetAvatar.open());



const profileValidation = new FormValidator(selectors, popupFormEditProfile);
const newCardValidation = new FormValidator(selectors, popupFormAddCard);
const setAvatarValidation = new FormValidator(selectors, popupFormSetAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
setAvatarValidation.enableValidation();



const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    "Content-type": "application/json",
    "authorization": "a4e76836-721c-4a61-8d8d-db1b2283f53f"
  }
});

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.avatar);
  })
  .catch(err => {
    console.log(`Произошла ошибка: ${err}`);
  });

api.getAllCards()
  .then (data => {
    section.renderItems(data);
  })
  .catch (err => {
    console.log(`Произошла ошибка: ${err}`);
  });





