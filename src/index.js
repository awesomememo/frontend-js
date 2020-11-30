import { CURR_USER_KEY } from "./Constant";
import IndexUI from "./ui/IndexUI";
import UserService from "./service/UserService";
import Util from "./lib/Util";

const userService = new UserService();
const ui = new IndexUI(document);
window.addEventListener("DOMContentLoaded", async () => {
  const currUserId = localStorage.getItem(CURR_USER_KEY);
  if (currUserId === null) {
    ui.logout();
    return;
  }
  const currUser = await userService.getUserById(currUserId);
  ui.logIn(currUser.username);
  const numStreakInSevenDays = Math.min(currUser.currStreak, 7);
  ui.paintStreak(numStreakInSevenDays);
});

ui.logoutBtn.addEventListener("click", () => {
  ui.logout();
  localStorage.removeItem(CURR_USER_KEY);
});

Util.closeNavbarAtClickOutside();
