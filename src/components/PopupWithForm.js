import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupSelector, submitForm}) {
    super (popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._submitButton = this._popup.querySelector('.popup__submit-button',);
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

  handleWaiting (isWaiting) {
    if (isWaiting) {
      this._submitButton.textContent = `${this._submitButton.textContent}...`;
    }
    else {
      this._submitButton.textContent = this._submitButton.textContent.substr(0, this._submitButton.textContent.length - 3);
    }
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
