import md5 from "md5";
import User from "../model/User";
import { BASE_URL } from "../Constant";

const userEndpoint = `${BASE_URL}/users`

export default class UserService {
  constructor() {}

  static validatePassword(inputPassword, savedPassword) {
    return md5(inputPassword) === savedPassword;
  }

  async saveUser(user) {
    if (!user.id) {
      user.password = md5(user.password);
    }
    const response = await fetch(userEndpoint, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const plainObj = await response.json();
    return User.parseJSON(plainObj);
  }

  async getUserByEmail(email) {
    const response = await fetch(`${userEndpoint}/${email}`);
    const resText = await response.text();
    if (resText) {
      return User.parseJSON(JSON.parse(resText));
    } else {
      return null;
    }
  }

  async checkEmail(email) {
    const user = await this.getUserByEmail(email);
    return user != null;
  }

  async getUserById(id) {
    const response = await fetch(`${userEndpoint}/${id}`);
    const resText = await response.text();
    if (resText) {
      return User.parseJSON(JSON.parse(resText));
    } else {
      return null;
    }
  }
}
