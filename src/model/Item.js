import Progress from "./Progress";

export default class Item {
  constructor(name, description, createTime) {
    this.name = name;
    this.description = description;
    this.createTime = createTime;
    this.progresses = [];
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

  addProgress(progress) {
    this.progresses.push(progress);
  }

  static parseJSON(plainObj) {
    const item = Object.assign(new Item(), plainObj);
    const progresses = item.progresses.map(Progress.parseJSON);
    item.progresses = progresses;
    return item;
  }
}
