import EasyHttp from "../lib/EasyHttp";
import Util from "../lib/Util";
import Item from "../model/Item";
import Progress from "../model/Progress";

const wordUrl = "http://localhost:3000/words";
const dateDifference = [1, 2, 3, 5, 8, 13];
const divisionForTheNumberOfDays = 1000 * 60 * 60 * 24;

export default class WordService {
  constructor() {
    this.client = new EasyHttp(wordUrl);
  }

  saveWord(word) {
    this.client.add(word);
    return word;
  }

  async get() {
    const plainObjs = await this.client.getAll();
    return plainObjs.map(Item.parseJSON);
  }

  updateWord(id, newWord) {
    this.client.update(id, newWord);
  }

  async getTodayWord() {
    const wordArray = await this.get();
    const newWordArray = wordArray.filter((wordObj) => {
      const progresses = wordObj.progresses;
      if (progresses.length === 0) {
        return true;
      }

      const lastProgressDate = new Date(progresses[progresses.length - 1].time);
      const lastProgress = progresses[progresses.length - 1];

      if (lastProgress.isPass === false) {
        return true;
      }

      const todayDate = Util.getTodayDate();
      const dayDifference = Math.floor((todayDate - lastProgressDate) / divisionForTheNumberOfDays);

      return dateDifference.includes(dayDifference);
    });

    return newWordArray;
  }
}
