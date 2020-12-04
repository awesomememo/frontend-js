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
      const progresses = word.progresses;
      if (progresses.length === 0) {
        return true;
      }

      const lastProgress = progresses[progresses.length - 1];
      if (!lastProgress.pass) {
        return true;
      }

      const lastProgressDate = new Date(lastProgress.time);
      const todayDate = Util.getTodayDate();
      const dayDifference = Math.floor((todayDate - lastProgressDate) / SECONDS_IN_A_DAY);

      return MEMORIZATION_DATES.includes(dayDifference);
    });

    return todayWordArray;
  }

  async getSoundByWordId(id) {
    const response = await fetch(`${BASE_URL}/items/${id}/sound`);
    const resText = await response.text();
    return resText;
  }
}
