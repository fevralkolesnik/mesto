export class UserInfo {
  constructor (nameSelector, descriptionSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = '';
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo (user) {
    this._name.textContent = user.name;
    this._description.textContent = user.about;
    this._userId = user._id;
  }

  setAvatar (link) {
    this._avatar.src = link;
  }

  getId () {
    return this._userId;
  }
}
