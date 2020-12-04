import Util from "../lib/Util";

export default class QuizUI {
  constructor(document) {
    this.document = document;
    this.wordTemplate = document.getElementById("word-template");
    this.noWordsLeft = document.getElementById("no-word-left");
    this.needMoreWords = document.getElementById("need-more-words");
    this.start = document.getElementById("start");
    this.startBtn = document.getElementById("start-btn");
    this.quizMain = document.getElementById("quiz-main");
    this.container = this.quizMain.querySelector(".container");
    this.hint = document.getElementById("hint");
    this.hintText = document.getElementById("hint-text");
    this.definition = document.getElementById("definition");
    this.definitionText = document.getElementById("definition-text");
    this.audio = document.getElementById("audio");
    this.audioElement = document.getElementById("audio-element");
    this.submitBtn = document.getElementById("submit-btn");
    this.wordInput = document.getElementById("word");
    this.validation = document.getElementById("validation");
    this.validationHeader = document.getElementById("validation-header");
    this.validationWord = document.getElementById("validation-word");
    this.validationDefinition = document.getElementById("validation-definition");
    this.validationBody = document.getElementById("validation-body");
    this.nextBtn = document.getElementById("next-btn");
    this.finishTemplate = document.getElementById("finish");
    this.wordsLeft = document.getElementById("words-left");
  }

  showItem(item, wordsLeft) {
    this.clearWordTemplate();

    if (item.hint) {
      const regex = new RegExp(item.name, "ig");
      const hint = item.hint.replace(regex, "____");

      this.hintText.textContent = hint;
    }

    if (item.description) {
      const regex = new RegExp(item.name, "ig");
      const description = item.description.replace(regex, "____");

      this.definitionText.textContent = description;
    }

    if (item.sound) {
      const blob = Util.b64toBlob(item.sound);
      this.audioElement.src = window.URL.createObjectURL(blob);
    }

    this.wordsLeft.textContent = wordsLeft;
  }

  validate(item) {
    this.finishTemplate.style.display = "none";
    this.start.style.display = "none";
    this.wordTemplate.style.display = "none";
    this.validation.style.display = "block";

    this.validationDefinition.textContent = `Definition: ${item.description}`;
    this.validationWord.textContent = `Word: ${item.name}`;

    if (this.wordInput.value.trim().toUpperCase() === item.name.toUpperCase()) {
      this.validationHeader.className = "text-success text-center";
      this.validationBody.className = "text-success text-center";
      this.validationHeader.innerHTML = `
      Correct! <i class="far fa-check-circle"></i>
      `;
      return true;
    }

    this.validationBody.className = "text-danger text-center";
    this.validationHeader.className = "text-danger text-center";
    this.validationHeader.innerHTML = `
    Wrong <i class="far fa-times-circle"></i>
    `;
    return false;
  }

  finish() {
    this.start.style.display = "none";
    this.wordTemplate.style.display = "none";
    this.validation.style.display = "none";
    this.noWordsLeft.style.display = "none";
    this.finishTemplate.style.display = "block";
  }

  noWordLeft() {
    this.noWordsLeft.style.display = "block";
    this.wordTemplate.style.display = "none";
    this.validation.style.display = "none";
    this.finishTemplate.style.display = "none";
    this.start.style.display = "none";
  }

  clearWordTemplate() {
    this.wordInput.value = "";
    this.hintText.style.display = "none";
    this.definitionText.style.display = "none";
    this.audioElement.src = "";

    this.start.style.display = "none";
    this.wordTemplate.style.display = "block";
    this.validation.style.display = "none";
    this.finishTemplate.style.display = "none";
    this.noWordsLeft.style.display = "none";
  }
}
