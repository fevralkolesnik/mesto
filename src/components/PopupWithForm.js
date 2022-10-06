import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupSelector, submitForm}) {
    super (popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues () {
    const formValues = {};

    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }


  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
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

    setTimeout(() => this._form.reset(), 1000);
  }
}
