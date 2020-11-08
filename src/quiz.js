import QuizUI from "./ui/QuizUI";
import WordService from "./service/WordService";
import Util from "./lib/Util";
import Progress from "./model/Progress";
import {LOCALSTORAGE_KEY} from './Constant';

const quizUi = new QuizUI(document);
const wordService = new WordService();
let correctWord;
let wordCount = 0;

async function* wordGenerator() {
  while (true) {
    const wordArray = await wordService.getTodayWordByUserId(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    if (wordArray.length === 0) {
      return;
    }
    for (let word of wordArray) {
      yield word;
    }
  }
}

const generator = wordGenerator();

async function showWord() {
  const wordObj = await generator.next();

  const word = wordObj.value;
  const done = wordObj.done;

  if (done) {
    if (wordCount === 0) {
      quizUi.noWordLeft();
      return;
    }

    quizUi.finish();
    return;
  }

  wordCount++;
  quizUi.showItem(word);
  correctWord = word;
}

quizUi.quizMain.addEventListener("click", (e) => {
  if (e.target === quizUi.startBtn || e.target === quizUi.nextBtn) {
    showWord();
    return;
  }

  if (e.target === quizUi.submitBtn) {
    const isPass = quizUi.validate(correctWord);
    const time = Util.getTodayDate();
    const progress = new Progress(time, isPass);
    const id = correctWord.id;
    correctWord.addProgress(progress);
    wordService.updateWord(id, correctWord);
    return;
  }

  if (e.target === quizUi.hint) {
    Util.toggleElement(quizUi.hintText);
    return;
  }

  if (e.target === quizUi.definition) {
    Util.toggleElement(quizUi.definitionText);
    return;
  }

  if (e.target === quizUi.audio) {
    quizUi.audioElement.play().catch(() => {});
  }
});
