export default class Streak {
  constructor(userId, date) {
    this.userId = userId;
    this.date = date;
  }

  setId(id) {
    this.id = id;
  }

  static parseJSON(plainObj) {
    const streak = new Streak(plainObj.userId, new Date(plainObj.date));
    streak.setId(plainObj.id);
    return streak;
  }
}
