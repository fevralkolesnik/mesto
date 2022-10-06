export class Card {
  constructor({card, selectors, userID, handleButtonLike, handleButtonDelete, handleCardClick}) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._isLiked = false;
    this._selectors = selectors;
    this._userID = userID;
    this._ownerID = card.owner._id;
    this._handleButtonLike = handleButtonLike;
    this._handleButtonDelete = handleButtonDelete;
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

  _switchLikeIcon () {
    this._isLiked = !this._isLiked;
    this._buttonLike.classList.toggle('element__like_active');
  }

  _countOfLikes(count) {
    this._countLikes.textContent = count;
  }

  _setLike(count) {
    this._switchLikeIcon();
    this._countOfLikes (count);
  }

  _isMyLike() {
    return this._isLiked;
  }


  _checkLikes() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userID) {
        this._switchLikeIcon();
      }
    }
  }

  _renderDeleteButton() {
    if (this._userID !== this._ownerID) {
      this._buttonDelete.classList.add(this._selectors.cardButtonDeleteDisabled);
      this._buttonDelete.setAttribute('disabled', 'true');
    }
  }

  _setEventListeners() {
    this._buttonLike = this._card.querySelector(this._selectors.cardButtonLike);
    this._buttonLike.addEventListener('click', () => this._handleButtonLike(this));

    this._buttonDelete = this._card.querySelector(this._selectors.cardButtonDelete);
    this._buttonDelete.addEventListener('click', () => this._handleButtonDelete());

    this._cardImage = this._card.querySelector(this._selectors.cardImage);
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._renderDeleteButton();

    this._checkLikes();

    this._cardName = this._card.querySelector(this._selectors.cardName);
    this._cardName.textContent = this._name;

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._countLikes = this._card.querySelector(this._selectors.cardCountLikes);
    this._countOfLikes(this._likes.length);

    return this._card;
  }
}
