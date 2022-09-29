export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose (evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => this._handleClickClose (evt));
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
