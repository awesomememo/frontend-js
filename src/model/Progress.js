export default class Progress {
  constructor(time, pass, itemId) {
    this.time = time;
    this.pass = pass;
    this.itemId = itemId;
  }

  setId(id) {
    this.id = id;
  }

  static parseJSON(plainObj) {
    const progress = new Progress(
      new Date(plainObj.time),
      plainObj.pass,
      plainObj.itemId
    );
    progress.setId(plainObj.id);
    return progress;
  }
}
