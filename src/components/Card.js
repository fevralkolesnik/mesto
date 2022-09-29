export class Card {
  constructor({link, name, selectors, handleCardClick}) {
    this._name = name;
    this._link = link;
    this._selectors = selectors;
    this._handleCardClick = handleCardClick;
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

    this._cardImage = this._card.querySelector(this._selectors.cardImage);
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._cardName = this._card.querySelector(this._selectors.cardName);
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._card;
  }
}
