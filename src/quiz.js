import QuizUI from "./ui/QuizUI";
import WordService from "./service/WordService";
import Progress from "./model/Progress";

const quizUi = new QuizUI(document);
const wordService = new WordService();
let correctWord;

async function* wordGenerator() {
  const wordArray = await wordService.getTodayWord();
  if (wordArray.length === 0) {
    quizUi.noWordLeft();
    return false;
  }

  for (let word of wordArray) {
    yield word;
  }
}

const generator = wordGenerator();

async function showWord() {
  const wordObj = await generator.next();
  const word = wordObj.value;
  const done = wordObj.done;

  if (word === false) {
    return;
  }

  if (done) {
    quizUi.finish();
    return;
  }

  quizUi.showItem(word);
  correctWord = word;
}

quizUi.startBtn.addEventListener("click", showWord);

quizUi.submitBtn.addEventListener("click", async () => {
  const isPass = quizUi.validate(correctWord);
  const time = new Date();
  const progress = new Progress(time, isPass);
  const id = await correctWord.id;
  correctWord.addProgress(progress);
  wordService.updateWord(id, correctWord);
});

quizUi.nextBtn.addEventListener("click", showWord);

quizUi.hint.addEventListener("click", () => {
  if (quizUi.hintText.style.display === "block") {
    quizUi.hintText.style.display = "none";
    return;
  }

  quizUi.hintText.style.display = "block";
});

quizUi.definition.addEventListener("click", () => {
  if (quizUi.definitionText.style.display === "block") {
    quizUi.definitionText.style.display = "none";
    return;
  }

  quizUi.definitionText.style.display = "block";
});

quizUi.audio.addEventListener("click", () => {
  quizUi.audioElement.play().catch(() => {});
});
