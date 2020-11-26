import { CURR_USER_KEY } from "./Constant";
import IndexUI from "./ui/IndexUI";
import UserService from "./service/UserService";

const userService = new UserService();
const ui = new IndexUI(document);
let navOpen = false;

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

document.getElementById("hamburger").addEventListener("click", () => {
  if (navOpen === false) {
    navOpen = true;
    document.getElementById("index-main").addEventListener("click", () => {
      document.getElementById("hamburger").click();
    });
  } else {
    navOpen = false;
    document.getElementById("index-main").removeEventListener("click", () => {
      click(document.getElementById("hamburger"));
    });
  }
});
