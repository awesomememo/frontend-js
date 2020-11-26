import { CURR_USER_KEY } from "./Constant";
import IndexUI from "./ui/IndexUI";
import UserService from "./service/UserService";

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
});

ui.logoutBtn.addEventListener("click", () => {
  ui.logout();
  localStorage.removeItem(CURR_USER_KEY);
});

userService.getUserById(localStorage.getItem(CURR_USER_KEY)).then((userObj) => {
  const numStreakInSevenDays = Math.min(userObj.streak, 7);

  ui.paintStreak(numStreakInSevenDays);
});
