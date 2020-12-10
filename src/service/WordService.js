import Util from "../lib/Util";
import Item from "../model/Item";
import { MEMORIZATION_DATES, SECONDS_IN_A_DAY, BASE_URL } from "../Constant";

const wordEndpoint = `${BASE_URL}/items`;

export default class WordService {
  constructor() {}

  async saveWord(word) {
    const response = await fetch(wordEndpoint, {
      method: "POST",
      body: JSON.stringify(word),
      headers: {
        "content-type": "application/json",
      },
    });
    const plainObj = await response.json();
    return Item.parseJSON(plainObj);
  }

  async getWordCountByUserId(userId) {
    const response = await fetch(`${wordEndpoint}/count/user/${userId}`);
    const resText = await response.text();
    return parseInt(resText);
  }

  async getAllWordsByUserId(userId) {
    const response = await fetch(`${wordEndpoint}/user/${userId}`);
    const plainObjs = await response.json();
    return plainObjs.map(Item.parseJSON);
  }

  async getTodayWordByUserId(userId) {
    const wordArray = await this.getAllWordsByUserId(userId);
    const todayWordArray = wordArray.filter((word) => {
      // new word, never did before
      const progresses = word.progresses;
      if (progresses.length === 0) {
        return true;
      }

      // last time, this word failed
      const lastProgress = progresses[progresses.length - 1];
      if (!lastProgress.pass) {
        return true;
      }

      const daysDone = progresses.filter((progress) => progress.pass).length;
      const requiredMemorizationDaysApart = MEMORIZATION_DATES[daysDone - 1];
      const actualDaysApart = (Util.getTodayDate() - word.createTime) / SECONDS_IN_A_DAY;

      return actualDaysApart >= requiredMemorizationDaysApart;
    });

    return todayWordArray.sort(() => Math.random() - 0.5);
  }

  async getSoundByWordId(id) {
    const response = await fetch(`${BASE_URL}/items/${id}/sound`);
    const resText = await response.text();
    return resText;
  }
}
