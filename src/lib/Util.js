export default class Util {
  static b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static getTodayDate() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static toggleElement(element) {
    if (element.style.display === "block") {
      element.style.display = "none";
      return;
    }

    element.style.display = "block";
  }

  static closeNavbarEventListeners(hamburgerBtn, mainElement) {
    let navOpen = false;

    hamburgerBtn.addEventListener("click", () => {
      if (navOpen === false) {
        navOpen = true;
        mainElement.addEventListener("click", () => {
          hamburgerBtn.click();
        });
      } else {
        navOpen = false;
        mainElement.removeEventListener("click", () => {
          click(hamburgerBtn);
        });
      }
    });
  }
}
