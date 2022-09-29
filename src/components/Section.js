export class Section {
  constructor ( {items, renderer}, containerSelector ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardNode) {
    this._container.prepend(cardNode);
  }

  renderItems() {
    this._items.forEach( (card) => {
      this._renderer(card);
    });
  }
}
