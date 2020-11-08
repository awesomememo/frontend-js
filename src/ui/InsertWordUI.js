import Item from "../model/Item";
import Util from "../lib/Util";

export default class InsertWordUI {
  constructor(document) {
    this.document = document;
    this.container = document.getElementById("main-container");
    this.item = document.getElementById("item");
    this.itemDescription = document.getElementById("item-description");
    this.exampleSentence = document.getElementById("example-sentence");
    this.player = document.getElementById("player");
    this.recordBtn = document.getElementById("record");
    this.stopBtn = document.getElementById("stop");
    this.addWordBtn = document.getElementById("add-word-btn");
    this.clearBtn = document.getElementById("clear");
    this.doneBtn = document.getElementById('done');
    this.chunks = [];
    this.contentType = "audio/ogg; codecs=opus";
    this.fileReader = new FileReader();
    this.mediaRecorder;

    this.init();
  }

  clear() {
    this.item.value = "";
    this.itemDescription.value = "";
    this.exampleSentence.value = "";
    this.player.src = "";
    this.savedEncoding64 = "";
  }

  init() {
    // 1. Initalize audio stream into mediaRecorder
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.addEventListener("dataavailable", (e) => {
        this.chunks.push(e.data);
      });

      // 1.1 Create Blob, feed to file reader, and attach to audio player
      this.mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(this.chunks, { type: this.contentType });

        this.fileReader.readAsDataURL(blob);
        this.chunks = [];
        const audioUrl = window.URL.createObjectURL(blob);
        this.player.src = audioUrl;
      });
    });

    // 2. Get encoded64 audio string
    this.fileReader.addEventListener("loadend", () => {
      this.savedEncoding64 = this.fileReader.result.split(",")[1];
    });

    // 3. Start mediaRecorder
    this.recordBtn.addEventListener("click", () => {
      if (this.mediaRecorder.state === "recording") {
        return;
      }

      this.mediaRecorder.start();
    });

    // 4. Stop mediaRecorder
    this.stopBtn.addEventListener("click", () => {
      if (this.mediaRecorder.state === "inactive") {
        return;
      }

      this.mediaRecorder.stop();
    });

    // 5. addEventListener
    this.clearBtn.addEventListener("click", () => this.clear());
  }

  checkInputs() {
    if (!this.item.value) {
      return false;
    }

    if (!this.itemDescription.value && !this.exampleSentence.value && !this.player.src) {
      return false;
    }
    return true;
  }

  createWordForUser(currUserId) {
    const name = this.item.value;
    const description = this.itemDescription.value;
    const exampleSentence = this.exampleSentence.value;
    const sound = this.savedEncoding64;
    const date = Util.getTodayDate();

    const item = new Item(name, description, date, currUserId);
    item.setSound(sound);
    item.setHint(exampleSentence);
    return item;
  }

  showAlert(alertMessage, alertType) {
    if (this.document.getElementsByClassName(`alert alert-dismissible alert-${alertType}`)[0]) {
      return;
    }

    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-dismissible alert-${alertType}`;
    alertDiv.innerHTML = `
    <button class="close" data-dismiss="alert">&times;</button>
    ${alertMessage}
    `;
    this.container.insertBefore(alertDiv, this.item);

    setTimeout(() => {
      alertDiv.remove();
    }, 8000);
  }
}
