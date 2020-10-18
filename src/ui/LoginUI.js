export default class LoginUI {
    constructor(document) {
        this.document = document;
        this.notFilledAlert = this.document.getElementById('login-not-filled-alert');
        this.failureAlert = this.document.getElementById('login-failure');
        this.failureMessage = this.document.getElementById('login-failure-message');
        this.email = this.document.getElementById('email');
        this.password = this.document.getElementById('password');
        this.loginBtn = this.document.getElementById('login-btn');
    }

    checkIfInputFilled() {
        if ((this.email.value === '') || (this.password.value === '')) {
            this.notFilledAlert.style.display = 'block';
            setTimeout(() => this.notFilledAlert.style.display = 'none', 2000);
            return false;
        }
        return true;
    }

    failure(message) {
        this.failureAlert.style.display = 'block';
        this.failureMessage.textContent = message;
        setTimeout(() => this.failureAlert.style.display = 'none', 3000);
    }

    clearInputs() {
        this.email.value = '';
        this.password.value = '';
    }
}
