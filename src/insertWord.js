import InsertUI from "./ui/InsertWordUI";

const insertUi = new InsertUI(document);

insertUi.setRecordSettings();

document
  .getElementById("clear")
  .addEventListener("click", () => insertUi.clear());
