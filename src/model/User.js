import { SECONDS_IN_A_DAY } from "../Constant";
import Streak from "./Streak";

export default class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.currStreak = 0;
    this.streaks = [];
    this.longestStreak = 0;
  }

  setId(id) {
    this.id = id;
  }

  findDaysApart(date) {
    if (this.streaks.length === 0) {
      return 0;
    }
    return (
      (date - this.streaks[this.streaks.length - 1].date) / SECONDS_IN_A_DAY
    );
  }

  updateStreak(date) {
    const streak = new Streak(this.id, date);
    if (this.streaks.length === 0) {
      this.streaks.push(streak);
      this.currStreak = 1;
      this.longestStreak = 1;
      return;
    }

    const numDaysApart = this.findDaysApart(date);

    if (numDaysApart > 0) {
      this.streaks.push(streak);

      if (numDaysApart > 1) {
        this.currStreak = 1;
      }

      if (numDaysApart === 1) {
        this.currStreak++;
      }

      if (this.currStreak > this.longestStreak) {
        this.longestStreak = this.currStreak;
      }
    }
  }

  static parseJSON(plainObj) {
    const user = Object.assign(new User(), plainObj);
    const streaks = user.streaks.map(Streak.parseJSON);
    user.streaks = streaks;
    return user;
  }
}
