export default class StreakUI {
  constructor(document) {
    this.document = document;
    this.currStreakEle = document.getElementById("number-of-day-streak");
    this.totalWordsEle = document.getElementById("total-words");
    this.longestStreakEle = document.getElementById("longest-streak");
  }

  paint(dayStreak, totalWords, longestStreak) {
    this.currStreakEle.textContent = dayStreak;
    this.totalWordsEle.textContent = totalWords;
    this.longestStreakEle.textContent = longestStreak;
  }
}
