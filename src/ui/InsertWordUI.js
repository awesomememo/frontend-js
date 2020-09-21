import Util from "../lib/Util";
import Item from "../model/Item";

export default class InsertWordUI {
  constructor(document) {
    this.document = document;
    this.alertHeading = document.getElementById("alert-heading");
    this.alertBody = document.getElementById("alert-body");
    this.item = document.getElementById("item");
    this.itemDescription = document.getElementById("item-description");
    this.exampleSentence = document.getElementById("example-sentence");
    this.player = document.getElementById("player");
    this.recordBtn = document.getElementById("record");
    this.stopBtn = this.document.getElementById("stop");
    this.addWordBtn = this.document.getElementById("add-word-btn");
    this.chunks = [];
    this.contentType = "audio/ogg; codecs=opus";
    this.fileReader = new FileReader();

    this.initRecording();
  }

  clear() {
    this.item.value = "";
    this.itemDescription.value = "";
    this.exampleSentence.value = "";
    this.player.src = "";
  }

  alert(header, body) {
    if (!header) {
      this.alertHeader.display = none;
    } else if (!body) {
      this.alertBody.display = none;
    }

    this.alertHeading.textContent = header;
    this.alertBody.textContent = body;
  }

  initRecording() {
    this.fileReader.addEventListener("loadend", () => {
      this.savedEncoding64 = this.fileReader.result.split(",")[1];
    });

    this.recordBtn.addEventListener("click", () => {
      if (mediaRecorder.state === "recording") {
        return;
      }

      mediaRecorder.start();
    });

    this.stopBtn.addEventListener("click", () => {
      if (mediaRecorder.state === "inactive") {
        return;
      }

      mediaRecorder.stop();
    });

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener("dataavailable", (e) => {
          chunks.push(e.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const blob = new Blob(chunks, { type: contentType });

          this.fileReader.readAsDataURL(blob);
          chunks = [];
          const audioUrl = window.URL.createObjectURL(blob);
          this.player.src = audioUrl;
        });
      });
  }
}
