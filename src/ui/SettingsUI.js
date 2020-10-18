export default class SettingsUi {
    constructor(document) {
        this.document = document;
        this.newUsername = this.document.getElementById('username');
        this.oldPassword = this.document.getElementById('old-password');
        this.newPassword = this.document.getElementById('new-password');
        this.saveChangesBtn = this.document.getElementById('save-changes-btn');
        this.passwordAlert = this.document.getElementById('settings-password-alert');
    }

    showPasswordAlert() {
        this.passwordAlert.style.display = 'block';
        setTimeout(() => this.passwordAlert.style.display = 'none', 2000);
    }
}
