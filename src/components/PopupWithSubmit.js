import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor ({popupSelector, submitForm}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  setEventListeners () {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitForm (this._cardId, this._card);
    });
  }

  open (cardId, cardNode) {
    super.open();
    this._cardId = cardId;
    this._card = cardNode;
  }
}
