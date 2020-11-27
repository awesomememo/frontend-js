import Util from "./lib/Util";
import InsertWordUI from "./ui/InsertWordUI";
import WordService from "./service/WordService";
import { CURR_USER_KEY } from "./Constant";

const insertUi = new InsertWordUI(document);
const wordService = new WordService();

insertUi.addWordBtn.addEventListener("click", addWord);

insertUi.doneBtn.addEventListener("click", async (e) => {
  if (!insertUi.checkIfInputFilled()) {
    return;
  }
  if (!(await addWord())) {
    e.preventDefault();
  }
});

async function addWord() {
  const inputPass = insertUi.checkInputs();
  if (!inputPass) {
    insertUi.showAlert("Please fill the word input and at least one of the following values", "danger");
    return false;
  }

  const word = insertUi.createWordForUser(JSON.parse(localStorage.getItem(CURR_USER_KEY)));
  await wordService.saveWord(word);
  insertUi.clear();

  return true;
}

Util.closeNavbarEventListeners(document.getElementById("hamburger"), document.getElementById("insertWord-main"));
