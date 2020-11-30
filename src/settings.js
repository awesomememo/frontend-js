import Util from "./lib/Util";
import { CURR_USER_KEY } from "./Constant";
import SettingsUI from "../src/ui/SettingsUI";
import UserService from "./service/UserService";

const ui = new SettingsUI(document);
const userService = new UserService();
const currUserId = JSON.parse(localStorage.getItem(CURR_USER_KEY));
let currUser;
let settingsChecked = null;

window.addEventListener("DOMContentLoaded", async () => {
  currUser = await userService.getUserById(currUserId);
  ui.newUsername.value = currUser.username;
});

ui.saveChangesBtn.addEventListener("click", async (e) => {
  if (settingsChecked) {
    currUser.username = ui.newUsername.value;
    currUser.password = ui.newPassword.value;
    await userService.saveUser(currUser);
    settingsChecked = null;
  } else if (settingsChecked === null) {
    e.preventDefault();
    if (ui.newUsername.value === "" || ui.newPassword.value === "") {
      settingsChecked = false;
      ui.saveChangesBtn.click();
      return;
    }

    if (!UserService.validatePassword(ui.oldPassword.value, currUser.password)) {
      ui.showPasswordAlert();
      settingsChecked = false;
      ui.saveChangesBtn.click();
      return;
    }

    settingsChecked = true;
    ui.saveChangesBtn.click();
  } else {
    e.preventDefault();
    settingsChecked = null;
  }
});

Util.closeNavbarAtClickOutside();
