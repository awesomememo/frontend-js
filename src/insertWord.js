import InsertWordUI from "./ui/InsertWordUI";
import WordService from "./service/WordService";
import {LOCALSTORAGE_KEY} from './Constant';

const insertUi = new InsertWordUI(document);
const wordService = new WordService();

insertUi.addWordBtn.addEventListener("click", () => {
  const inputPass = insertUi.checkInputs();
  if (!inputPass) {
    insertUi.showAlert("Please fill the word input and make a recording or fill in the definition or example sentence input", "danger");
    return;
  }

  const word = insertUi.createWordForUser(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  wordService.saveWord(word);

  insertUi.clear();
});
