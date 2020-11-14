import EasyHttp from "../lib/EasyHttp";
import Util from "../lib/Util";
import Item from "../model/Item";
import { MEMORIZATION_DATES, SECONDS_IN_A_DAY } from "../Constant";

export default class WordService {
  constructor() {
    this.client = new EasyHttp("http://localhost:3000/words");
  }

  async saveWord(word) {
    const wordObj = await this.client.add(word)
    return Item.parseJSON(wordObj);
  }

  async get() {
    const plainObjs = await this.client.getAll();
    return plainObjs.map(Item.parseJSON);
  }

  updateWord(id, newWord) {
    this.client.update(id, newWord);
  }

  async getTodayWordByUserId(currUserId) {
    const wordArray = await this.get();
    const newWordArray = wordArray.filter((wordObj) => {
      if (wordObj.userId !== currUserId) {
        return;
      }
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
      const dayDifference = Math.floor((todayDate - lastProgressDate) / SECONDS_IN_A_DAY);

      return MEMORIZATION_DATES.includes(dayDifference);
    });

    return newWordArray;
  }
}
