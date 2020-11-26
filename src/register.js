import { CURR_USER_KEY } from "./Constant";
import RegisterUI from "./ui/RegisterUI";
import UserService from "./service/UserService";

const ui = new RegisterUI(document);
const userService = new UserService();
let registerSuccess = null;

ui.registerBtn.addEventListener("click", async (e) => {
  if (registerSuccess) {
    const user = ui.createUser();
    const createdUser = await userService.addUser(user);
    if (createdUser) {
      ui.clearInputs();
      localStorage.setItem(CURR_USER_KEY, createdUser.id);
    }
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
    registerSuccess = true;
    ui.registerBtn.click();
  } else {
    e.preventDefault();
    registerSuccess = null;
  }
});
