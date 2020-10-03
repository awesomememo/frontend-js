import RegisterUI from './ui/RegisterUI';
import UserService from './service/UserService';

const ui = new RegisterUI(document);
const userService = new UserService();

ui.registerBtn.addEventListener('click', async () => {
    if (!ui.checkIfInputFilled()) {
        return;
    }
    const user = ui.createUser();
    if (!user) {
        return;
    }
    if (!(await userService.checkEmail(user))) {
        ui.showEmailAlert();
        return;
    }
    if (!(await userService.checkUsername(user))) {
        ui.showUsernameAlert();
        return;
    }

    const createdUser = await userService.addUser(user);
    if (createdUser) {
        ui.clearInputs();
        const id = createdUser.id;
        localStorage.setItem('currUser', JSON.stringify(createdUser));
        // See if better way (in case of changing localhost to somthing else)
        window.location.assign('http://localhost:8080/index.html');
    }
});