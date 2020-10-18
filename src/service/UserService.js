import md5 from "md5";
import EasyHttp from "../lib/EasyHttp";
import User from "../model/User";

export default class UserService {
  constructor() {
    this.userClient = new EasyHttp("http://localhost:3000/users");
  }

  async checkEmail(email) {
    const users = await this.userClient.getAll();
    return users.some((currUser) => currUser.email === email);
  }

  static validatePassword(inputPassword, savedPassword) {
    return md5(inputPassword) === savedPassword;
  }

  async addUser(user) {
    const plainObj = await this.userClient.add(UserService.hashPassword(user));
    if (!plainObj) {
      return null;
    }
    return Object.assign(new User(), plainObj);
  }

  async updateUser(id, newUser) {
    const plainObj = await this.userClient.update(id, UserService.hashPassword(newUser));
    if (!plainObj) {
      return null;
    }
    return Object.assign(new User(), plainObj);
  }

  async getUserByEmail(email) {
    const users = await this.userClient.getAll();
    const plainObj = users.find((currUser) => currUser.email === email);
    if (!plainObj) {
      return null;
    }
    return Object.assign(new User(), plainObj);
  }

  async getUserById(id) {
    const plainObj = await this.userClient.getById(id);
    if (!plainObj) {
      return null;
    }
    return Object.assign(new User(), plainObj);
  }

  static hashPassword(user) {
    user.password = md5(user.password);
    return user;
  }
}
