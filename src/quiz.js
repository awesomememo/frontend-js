import QuizUI from "./ui/QuizUI";
import WordService from "./service/WordService";
import Util from "./lib/Util";
import Progress from "./model/Progress";
import { CURR_USER_KEY } from "./Constant";
import UserService from "./service/UserService";

const quizUi = new QuizUI(document);
const wordService = new WordService();
const userId = JSON.parse(localStorage.getItem(CURR_USER_KEY));
const userService = new UserService();
let wordsLeft;
let totalWords;

wordService.getTodayWordByUserId(userId).then((wordArray) => {
  totalWords = wordArray.length;
});

userService.getUserById(userId).then((user) => {
  let correctWord;
  let wordCount = 0;

  async function* wordGenerator() {
    while (true) {
      const wordArray = await wordService.getTodayWordByUserId(userId);
      if (wordArray.length === 0) {
        return;
      }
      for (let word of wordArray) {
        yield word;
      }
    }
  }

  async function findWordsLeft() {
    const wordArray = await wordService.getTodayWordByUserId(userId);
    wordsLeft = wordArray.filter((item) => {
      if (item.progresses.length === 0) {
        return true;
      }

      return item.progresses[item.progresses.length - 1].time !== Util.getTodayDate().toISOString();
    }).length;

    wordArray.forEach((item) => {
      if (item.progresses.length === 0) {
        return;
      }

      if (item.progresses[item.progresses.length - 1].time === Util.getTodayDate().toISOString() && item.progresses[item.progresses.length - 1].isPass === false) {
        totalWords++;
        wordsLeft++;
      }
    });
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

      const date = Util.getTodayDate();
      user.updateStreak(date);
      userService.updateUser(userId, user);
      return;
    }

    wordCount++;

    const finishedWords = totalWords - wordsLeft;
    quizUi.showItem(word, finishedWords, totalWords);
    correctWord = word;
  }

  quizUi.quizMain.addEventListener("click", (e) => {
    if (e.target === quizUi.startBtn || e.target === quizUi.nextBtn) {
      findWordsLeft().then(() => {
        showWord();
      });
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
});

Util.closeNavbarAtClickOutside();
