import Util from "./lib/Util";
import { CURR_USER_KEY } from "./Constant";
import UserService from "./service/UserService";
import LoginUI from "./ui/LoginUI";

const ui = new LoginUI(document);
const userService = new UserService();
let loginSuccess = null;

ui.loginBtn.addEventListener("click", async (e) => {
  if (loginSuccess) {
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

    const isPasswordValid = UserService.validatePassword(ui.password.value, user.password);

    if (!isPasswordValid) {
      loginSuccess = false;
      ui.failure("Password is wrong");
      ui.loginBtn.click();
      return;
    }
    
    loginSuccess = true;
    ui.clearInputs();
    localStorage.setItem(CURR_USER_KEY, user.id);
    ui.loginBtn.click();
  } else {
    e.preventDefault();
    loginSuccess = null;
  }
});

Util.closeNavbarAtClickOutside();
