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

      this._submitForm (this._item, this._itemID);
    });
  }

  open (item, itemID) {
    super.open();
    this._item = item;
    this._itemID = itemID;
  }
}
