import InsertUI from "./ui/InsertWordUI";
import WordService from "./service/WordService";

const insertUi = new InsertUI(document);
const wordService = new WordService();

insertUi.addWordBtn.addEventListener("click", () => {
  const word = insertUi.createWord();
  wordService.saveWord(word);

  insertUi.clear();
});
