import UserService, {NO_ACCOUNT, PASSWORD_WRONG} from "./service/UserService";
import LoginUI from "./ui/LoginUI";

const ui = new LoginUI(document);
const userService = new UserService();

ui.loginBtn.addEventListener("click", async () => {
  if (!ui.checkIfInputFilled()) {
    return;
  }

  const checkStatus = await userService.checkUser(ui.email.value, ui.password.value);
  if (checkStatus === NO_ACCOUNT) {
    ui.failure("User does not exist");
  } else if (checkStatus === PASSWORD_WRONG) {
    ui.failure("Password is wrong");
  } else {
    const user = await userService.getUserByEmail(ui.email.value);
    const id = user.id;
    ui.clearInputs();
    localStorage.setItem('currUser', JSON.stringify(user));

    // See if better way (in case of changing localhost to somthing else)
    window.location.assign('http://localhost:8080/index.html');
  }
});