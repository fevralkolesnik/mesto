export class Card {
  constructor(link, name, selectors, showImagePopup) {
    this._name = name;
    this._link = link;
    this._selectors = selectors;
    this._showImagePopup = showImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectors.cardTemplate)
      .content
      .querySelector(this._selectors.card)
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
    this._buttonLike = this._card.querySelector(this._selectors.cardButtonLike);
    this._buttonLike.addEventListener('click', this._handleButtonLike);

    this._buttonDelete = this._card.querySelector(this._selectors.cardButtonDelete);
    this._buttonDelete.addEventListener('click', () => this._handleButtonDelete());


    this._card.querySelector(this._selectors.cardImage).addEventListener('click', () => this._showImagePopup(this._link, this._name));
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(this._selectors.cardName).textContent = this._name;
    this._card.querySelector(this._selectors.cardImage).alt = this._name;
    this._card.querySelector(this._selectors.cardImage).src = this._link;

    return this._card;
  }
}
