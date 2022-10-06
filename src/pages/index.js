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

function createCard (item) {
  const userID = userInfo.getId();
  const newCard = new Card({
    card: item,
    selectors: selectors,
    userID: userID,
    handleButtonLike: (card) => {
      if (!card.isMyLike()) {
        api.addLikeCard(item._id)
          .then ((data) => {
            card.setLike(data.likes.length);
          })
          .catch (err => {
            console.log(`Произошла ошибка: ${err}`);
          });
      }
      else {
        api.deleteLikeCard(item._id)
          .then ((data) => {
            card.setLike(data.likes.length);
          })
          .catch (err => {
            console.log(`Произошла ошибка: ${err}`);
          });
      }
    },
    handleButtonDelete: (card) => {
      popupDeleteCard.open(card, item._id);
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
    popupEditProfile.handleWaiting(true);
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
        popupEditProfile.handleWaiting(false);
      })
  }
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm ( {
  popupSelector: selectors.popupAddCard,
  submitForm: (card) => {
    popupAddCard.handleWaiting(true);
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
        popupAddCard.handleWaiting(false);
      })
  }
});
popupAddCard.setEventListeners();

const popupSetAvatar = new PopupWithForm ( {
  popupSelector: selectors.popupSetAvatar,
  submitForm: (avatar) => {
    popupSetAvatar.handleWaiting(true);
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
        popupSetAvatar.handleWaiting(false);
      })
  }
});
popupSetAvatar.setEventListeners();

const popupDeleteCard = new PopupWithSubmit ( {
  popupSelector: selectors.popupDeleteCard,
  submitForm: (card, cardID) => {
    api.deleteCard(cardID)
      .then (() => {
        card.deleteCard();

        popupDeleteCard.close();
      })
      .catch (err => {
        console.log(`Произошла ошибка: ${err}`);
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

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then ((data) => {
    userInfo.setUserInfo(data[0]);
    userInfo.setAvatar(data[0].avatar);

    section.renderItems(data[1]);
  })
  .catch (err => {
    console.log(`Произошла ошибка: ${err}`);
  });




