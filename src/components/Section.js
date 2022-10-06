export class Section {
  constructor ( {renderer}, containerSelector ) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardNode) {
    this._container.prepend(cardNode);
  }

  addInitialItems(cardNode) {
    this._container.append(cardNode);
  }

  renderItems(initialCards) {
    initialCards.forEach( (card) => {
      this._renderer(card);
    });
  }
}
