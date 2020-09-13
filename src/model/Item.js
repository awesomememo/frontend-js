export default class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  setId(id) {
    this.id = id;
  }

  setSound(sound) {
    this.sound = sound;
  }

  setImage(image) {
    this.image = image;
  }

  setHint(hint) {
    this.hint = hint;
  }
}
