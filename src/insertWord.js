import InsertUI from "./ui/InsertWordUI";
import WordService from "./service/WordService";

const insertUi = new InsertUI(document);
const wordService = new WordService();

insertUi.init();

insertUi.clearBtn.addEventListener("click", () => insertUi.clear());

insertUi.addWordBtn.addEventListener("click", () => {
  const word = insertUi.createWord();
  wordService.saveWord(word);

  insertUi.clear();
});
