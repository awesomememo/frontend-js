import { LOCALSTORAGE_KEY } from "./Constant";
import UserService from "./service/UserService";
import LoginUI from "./ui/LoginUI";

const ui = new LoginUI(document);
const userService = new UserService();
let loginSuccess = null;

ui.loginBtn.addEventListener("click", async (e) => {
  if (loginSuccess) {
    const user = await userService.getUserByEmail(ui.email.value);
    ui.clearInputs();
    localStorage.setItem(LOCALSTORAGE_KEY, user.id);
    loginSuccess = null;
  } else if (loginSuccess === null) {
    e.preventDefault();
    if (!ui.checkIfInputFilled()) {
      loginSuccess = false;
      ui.loginBtn.click();
      return;
    }

    const user = await userService.getUserByEmail(ui.email.value);
    if (!user) {
      loginSuccess = false;
      ui.failure("User does not exist");
      ui.loginBtn.click();
      return;
    }

    const isPasswordValid = UserService.validatePassword(
      ui.password.value,
      user.password
    );

    if (!isPasswordValid) {
      loginSuccess = false;
      ui.failure("Password is wrong");
      ui.loginBtn.click();
      return;
    }
    loginSuccess = true;
    ui.loginBtn.click();
  } else {
    e.preventDefault();
    loginSuccess = null;
  }
});
