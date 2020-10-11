import EasyHttp from "../lib/EasyHttp";
import Item from "../model/Item";
import Progress from "../model/Progress";

const wordUrl = "http://localhost:3000/words";

export default class WordService {
  constructor() {
    this.client = new EasyHttp(wordUrl);
  }

  saveWord(word) {
    const createDate = new Date(
      word.createTime.getFullYear(),
      word.createTime.getMonth(),
      word.createTime.getDate()
    );
    const item = new Item(word.name, word.description, createDate);
    item.setHint(word.hint);
    item.setSound(word.sound);
    this.client.add(item);
  }

  async get() {
    const plainObjs = await this.client.getAll();
    return plainObjs.map((plainObj) => {
      const item = Object.assign(new Item(), plainObj);
      item.progresses = item.progresses.map((progress) =>
        Object.assign(new Progress(), progress)
      );

      return item;
    });
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

      const lastProgressDate = progresses[progresses.length - 1].time;

      const todayDateTime = new Date();
      const todayDate = new Date(
        todayDateTime.getFullYear(),
        todayDateTime.getMonth(),
        todayDateTime.getDate()
      );

      return (
        todayDate - lastProgressDate === 1 ||
        todayDate - lastProgressDate === 2 ||
        todayDate - lastProgressDate === 3 ||
        todayDate - lastProgressDate === 5 ||
        todayDate - lastProgressDate === 8 ||
        todayDate - lastProgressDate === 13
      );
    });

    return newWordArray;
  }
}
