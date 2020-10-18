export default class IndexUI {
  constructor(document) {
    this.document = document;
    this.nameEle = this.document.getElementById("name");
    this.loginBtn = this.document.getElementById("login");
    this.registerBtn = this.document.getElementById("register");
    this.logoutBtn = this.document.getElementById("logout");
    this.settingsBtn = this.document.getElementById("settings");
  }

  logIn(name) {
    this.nameEle.textContent = name;
    this.loginBtn.style.display = "none";
    this.registerBtn.style.display = "none";
    this.logoutBtn.style.display = "block";
    this.settingsBtn.style.display = "block";
  }

  logout() {
    this.loginBtn.style.display = "block";
    this.registerBtn.style.display = "block";
    this.logoutBtn.style.display = "none";
    this.settingsBtn.style.display = "none";
    this.nameEle.textContent = "";
  }
}
