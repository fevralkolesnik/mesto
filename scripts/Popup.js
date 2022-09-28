import { selectors } from "./constants.js";

export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose (evt) {
    if (evt.key === selectors.Esc) {
      this.close();
    }
  }

  _handleClickClose (evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains(selectors.popupCloseButton)) {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => this._handleClickClose (evt));
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
}
