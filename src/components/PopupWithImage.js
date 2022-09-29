import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector, linkSelector, nameSelector) {
    super(popupSelector);
    this._popupImageLink = this._popup.querySelector(linkSelector);
    this._popupImageName = this._popup.querySelector(nameSelector);
  }

  open(link, name) {
    super.open();

    this._popupImageLink.src = link;
    this._popupImageLink.alt = name;
    this._popupImageName.textContent = name;
  }
}
