import EasyHttp from "../lib/EasyHttp";
import Item from "../model/Item";

const wordUrl = "http://localhost:3000/words";

export default class WordService {
  constructor() {
    this.client = new EasyHttp(wordUrl);
  }
}
