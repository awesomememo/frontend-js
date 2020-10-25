import { LOCALSTORAGE_KEY } from "./Constant";
import IndexUI from "./ui/IndexUI";
import UserService from "./service/UserService";

const userService = new UserService();
const ui = new IndexUI(document);

window.addEventListener("DOMContentLoaded", async () => {
  const currUserId = localStorage.getItem(LOCALSTORAGE_KEY);
  if (currUserId === null) {
    ui.logout();
    return;
  }
  const currUser = await userService.getUserById(currUserId);
  ui.logIn(currUser.username);
});

ui.logoutBtn.addEventListener("click", () => {
  ui.logout();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});
