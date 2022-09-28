import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupSelector, submitForm}) {
    super (popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  _getInputValues () {
    return this._form.elements;
  }

  setEventListeners () {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const elementsForm = this._getInputValues();

      this._submitForm (elementsForm);
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
