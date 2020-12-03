import Util from "./lib/Util";
import WordService from "./service/WordService";
import StreakUI from "./ui/StreakUI";
import { CURR_USER_KEY } from "./Constant";
import UserService from "./service/UserService";

const wordService = new WordService();
const streakUI = new StreakUI(document);
const userService = new UserService();
const userId = parseInt(localStorage.getItem(CURR_USER_KEY));

wordService.getWordCountByUserId(userId).then((wordCount) => {
  userService.getUserById(userId).then((user) => {
    const currStreak = user.currStreak;
    const longestStreak = user.longestStreak;
    streakUI.paint(currStreak, wordCount, longestStreak);
  });
});

Util.closeNavbarAtClickOutside();
