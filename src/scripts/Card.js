import { selectors } from "./constants.js";

export class Card {
  constructor({link, name, handleCardClick}) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(selectors.cardTemplate)
      .content
      .querySelector(selectors.card)
      .cloneNode(true);

    return cardElement;
  }

  _handleButtonLike() {
    this.classList.toggle('element__like_active');
  }

  _handleButtonDelete() {
    this._card.remove();
    this._card = null;
  }


  _setEventListeners() {
    this._buttonLike = this._card.querySelector(selectors.cardButtonLike);
    this._buttonLike.addEventListener('click', this._handleButtonLike);

    this._buttonDelete = this._card.querySelector(selectors.cardButtonDelete);
    this._buttonDelete.addEventListener('click', () => this._handleButtonDelete());


    this._card.querySelector(selectors.cardImage).addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(selectors.cardName).textContent = this._name;
    this._card.querySelector(selectors.cardImage).alt = this._name;
    this._card.querySelector(selectors.cardImage).src = this._link;

    return this._card;
  }
}
