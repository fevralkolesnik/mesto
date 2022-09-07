export class Card {
  constructor(link, name, selectors, openPopup, addEscListener) {
    this._name = name;
    this._link = link;
    this._selectors = selectors;
    this._openPopup = openPopup;
    this._addEscListener = addEscListener;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectors.cardTemplate)
      .content
      .querySelector(this._selectors.card)
      .cloneNode(true);

    return cardElement;
  }

  _showImagePopup() {
    const popupImageView = document.querySelector(this._selectors.popupImageView);
    const popupImageLink = popupImageView.querySelector(this._selectors.popupImageLink);
    const popupImageName = popupImageView.querySelector(this._selectors.popupImageName);

    popupImageLink.src = this._link;
    popupImageLink.alt = this._name;
    popupImageName.textContent = this._name;

    this._openPopup(popupImageView);
    this._addEscListener(popupImageView);
  }

  _setEventListeners() {
    this._buttonLike = this._card.querySelector(this._selectors.cardButtonLike);
    this._buttonLike.addEventListener('click', () =>
      this._buttonLike.classList.toggle('element__like_active'));

    this._buttonDelete = this._card.querySelector(this._selectors.cardButtonDelete);
    this._buttonDelete.addEventListener('click', () => this._card.remove());

    this._card.querySelector(this._selectors.cardImage).addEventListener('click', () => {
      this._showImagePopup();
    });
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
