import WordService from "./service/WordService";
import StreakUI from "./ui/StreakUI";
import { CURR_USER_KEY } from "./Constant";
import UserService from "./service/UserService";

const wordService = new WordService();
const streakUI = new StreakUI(document);
const userService = new UserService();
const userId = parseInt(localStorage.getItem(CURR_USER_KEY));

wordService.get().then((words) => {
  const userWords = words.filter((word) => word.userId === userId);
  const totalWords = userWords.length;

  userService.getUserById(userId).then((userObj) => {
    const currStreak = userObj.streak;
    const longestStreak = userObj.longestStreak;
    streakUI.paint(currStreak, totalWords, longestStreak);
  });
});
