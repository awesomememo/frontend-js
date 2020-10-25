export default class IndexUI {
  constructor(document) {
    this.document = document;
    this.nameEle = this.document.getElementById("name");
    this.loginBtn = this.document.getElementById("login");
    this.registerBtn = this.document.getElementById("register");
    this.logoutBtn = this.document.getElementById("logout");
    this.settingsBtn = this.document.getElementById("settings");
    this.navAddWordBtn = this.document.getElementById("add-word");
    this.navQuiz = this.document.getElementById("quiz");
    this.mainAddWordBtn = this.document.getElementById("main-add-word");
    this.mainQuiz = this.document.getElementById("main-quiz");
  }

  logIn(name) {
    this.nameEle.textContent = name;
    this.loginBtn.style.display = "none";
    this.registerBtn.style.display = "none";
    this.logoutBtn.style.display = "block";
    this.settingsBtn.style.display = "block";
    this.navAddWordBtn.style.display = "block";
    this.mainAddWordBtn.style.display = "block";
    this.navQuiz.style.display = "block";
    this.mainQuiz.style.display = "block";
  }

  logout() {
    this.loginBtn.style.display = "block";
    this.registerBtn.style.display = "block";
    this.logoutBtn.style.display = "none";
    this.settingsBtn.style.display = "none";
    this.navAddWordBtn.style.display = "none";
    this.mainAddWordBtn.style.display = "none";
    this.navQuiz.style.display = "none";
    this.mainQuiz.style.display = "none";
    this.nameEle.textContent = "";
  }
}
