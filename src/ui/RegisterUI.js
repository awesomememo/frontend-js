import User from '../model/User';

export default class RegisterUI {
    constructor(document) {
        this.document = document;
        this.notFilledAlert = this.document.getElementById('register-not-filled-alert');
        this.emailAlert = this.document.getElementById('email-alert');
        this.passwordAlert = this.document.getElementById('password-alert');
        this.email = this.document.getElementById('email');
        this.username = this.document.getElementById('username');
        this.password = this.document.getElementById('password');
        this.confirmPassword = this.document.getElementById('confirm-password');
        this.registerBtn = this.document.getElementById('register-btn');
    }

    showEmailAlert() {
        this.showAlert(this.emailAlert);
    }

    checkIfInputFilled() {
        if ((this.email.value === '') || (this.username.value === '') || (this.password.value === '') || (this.confirmPassword.value === '')) {
            this.showAlert(this.notFilledAlert);
            return false;
        }
        return true;
    }

    showAlert(alert) {
        alert.style.display = 'block';
        setTimeout(() => alert.style.display = 'none', 2000);
    }

    clearInputs() {
        this.email.value = '';
        this.username.value = '';
        this.password.value = '';
        this.confirmPassword.value = '';
    }

    createUser() {
        if (this.password.value === this.confirmPassword.value) {
            return new User(this.username.value, this.email.value, this.password.value);
        }
        this.showAlert(this.passwordAlert);
        return null;
    }
}
