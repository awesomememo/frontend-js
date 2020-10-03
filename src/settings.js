// need md5
import SettingsUI from '../src/ui/SettingsUI';
import UserService from './service/UserService';
import User from './model/User';

const ui = new SettingsUI(document);
const userService = new UserService();
let currUser = JSON.parse(localStorage.getItem('currUser'));

ui.saveChangesBtn.addEventListener('click', async () => {
    // md5 password before checking
    if (ui.oldPassword.value !== currUser.password) {
        ui.showPasswordAlert();
        return;
    }

    // md5 password before creating user
    const newUser = new User(ui.newUsername.value, currUser.email, ui.newPassword.value);
    if (!userService.checkUsername(newUser)) {
        return;
    }
    currUser = await userService.updateUser(currUser.id, newUser);
    localStorage.setItem('currUser', JSON.stringify(currUser));

    // See if better way (in case of changing localhost to somthing else)
    window.location.assign('http://localhost:8080/index.html');
});