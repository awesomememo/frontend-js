import InsertUI from "./ui/InsertWordUI";
import WordService from "./service/WordService";

const insertUi = new InsertUI(document);
const wordService = new WordService();

insertUi.addWordBtn.addEventListener("click", () => {
  const inputPass = insertUi.checkInputs();
  if (!inputPass) {
    insertUi.showAlert("Please fill the word input and make a recording or fill in the definition or example sentence input", "danger");
    return;
  }

  const word = insertUi.createWord();
  wordService.saveWord(word);

  insertUi.clear();
});
