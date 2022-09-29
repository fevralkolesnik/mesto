import { Popup } from "./Popup.js";
import { popupImageLink, popupImageName } from './constants.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    super.open();

    popupImageLink.src = link;
    popupImageLink.alt = name;
    popupImageName.textContent = name;
  }
}
