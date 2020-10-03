// Need md5
import EasyHttp from "../lib/EasyHttp";

export const PASSWORD_WRONG = 1;
export const NO_ACCOUNT = 2;
export const LOGIN_SUCCESS = 3;
export default class UserService {
  constructor() {
    this.userClient = new EasyHttp("http://localhost:3000/users");
  }

  async checkEmail(user) {
    const users = await this.userClient.get();
    if (users.map((currUser) => currUser.email).includes(user.email)) {
      return false;
    }
    return true;
  }

  async checkUsername(user) {
    const users = await this.userClient.get();
    if (
      users.map((currUser) => currUser.username).includes(user.username)
    ) {
      return false;
    }
    return true;
  }

  async checkUser(email, password) {
    const users = await this.userClient.get();
    const user = users.find((currUser) => currUser.email === email);

    // md5 the given password before checking
    if (user && user.password === password) {
      return LOGIN_SUCCESS;
    }

    if (!user) {
      return NO_ACCOUNT;
    }

    return PASSWORD_WRONG;
  }

  async addUser(user) {
    // md5 the password before adding user
    return await this.userClient.add(user);
  }

  async updateUser(id, newUser) {
    return await this.userClient.update(id, newUser);
  }

  async getUserByEmail(email) {
    const users = await this.userClient.get();
    return users.find((currUser) => currUser.email === email);
  }
}
