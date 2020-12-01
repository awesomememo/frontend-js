import Util from "./lib/Util";
import { CURR_USER_KEY } from "./Constant";
import RegisterUI from "./ui/RegisterUI";
import UserService from "./service/UserService";

const ui = new RegisterUI(document);
const userService = new UserService();
let registerSuccess = null;

ui.registerBtn.addEventListener("click", async (e) => {
  if (registerSuccess) {
    registerSuccess = null;
  } else if (registerSuccess === null) {
    e.preventDefault();
    if (!ui.checkIfInputFilled()) {
      registerSuccess = false;
      ui.registerBtn.click();
      return;
    }
    const user = ui.createUser();
    if (!user) {
      registerSuccess = false;
      ui.registerBtn.click();
      return;
    }
    if (await userService.checkEmail(user.email)) {
      ui.showEmailAlert();
      registerSuccess = false;
      ui.registerBtn.click();
      return;
    }
    const savedUser = await userService.saveUser(user);
    ui.clearInputs();
    localStorage.setItem(CURR_USER_KEY, savedUser.id);
    registerSuccess = true;
    ui.registerBtn.click();
  } else {
    e.preventDefault();
    registerSuccess = null;
  }
});

Util.closeNavbarAtClickOutside();
