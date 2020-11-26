import { SECONDS_IN_A_DAY } from "../Constant";

export default class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.streak = 0;
    this.streakArray = [];
    this.longestStreak = 0;
  }

  setId(id) {
    this.id = id;
  }

  findDaysApart(date) {
    return (date - new Date(this.streakArray[this.streakArray.length - 1])) / SECONDS_IN_A_DAY;
  }

  updateStreak(date) {
    const numDaysApart = this.findDaysApart(date);

    if (this.streakArray.length === 0) {
      this.streakArray.push(date);

      this.streak = 1;
      this.longestStreak = 1;
    }

    if (this.streakArray[this.streakArray.length - 1] !== date) {
      if (numDaysApart > 1) {
        this.streak = 1;
      }

      if (numDaysApart === 1) {
        this.streak++;
      }

      if (this.streak > this.longestStreak) {
        this.longestStreak = this.streak;
      }
    }
  }

  static parseJSON(plainObj) {
    return Object.assign(new User(), plainObj);
  }
}
