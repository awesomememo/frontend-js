export default class Progress {
  constructor(time, isPass) {
    this.time = time;
    this.isPass = isPass;
  }

  static parseJSON(plainObj) {
    return Object.assign(new Progress(), plainObj);
  }
}
