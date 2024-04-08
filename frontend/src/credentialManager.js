import { socket } from "./globals";

export class Creds {
  constructor() {}
  encodeBase64(data) {
    return btoa(data);
  }
  decodeBase64(data) {
    
    return atob(data);
  }
  getStorage() {
    return window.localStorage;
  }
  /**
   * saves the users data in storage
   * @param {JSON} userData 
   */
  saveData(userData) {
    if (userData.constructor != {}.constructor) userData = JSON.parse(userData);

    let encoded = this.encodeBase64(userData.username) + "." + this.encodeBase64(userData.password);

    this.getStorage().setItem("token", encoded);
    this.getStorage().setItem("email", userData.email);
    this.getStorage().setItem("userId", userData.userId);
  }
  /**
   * saves the data to storage
   * @param {string} username 
   * @param {string} password 
   * @param {string} email 
   * @param {string} userId 
   */
  SaveData(username, password, email, userId) {
    let user = { username: username, password: password, email: email, userId: userId };
    this.saveData(user);
  }
  /**
   * 
   * @returns checks if any data is saved in storage
   */
  hasData() {
    return this.getData() == undefined ? false : true;
  }
  /** gets the users saved data */
  getData() {
    if (!this.getStorage().getItem("token")) return undefined;
    if (!this.getStorage().getItem("email")) return undefined;
    if (!this.getStorage().getItem("userId")) return undefined;
    let token = this.getStorage().getItem("token").split(".");
    return {
      username: this.decodeBase64(token[0]),
      password: this.decodeBase64(token[1]),
      email: this.getStorage().getItem("email"),
      userId: this.getStorage().getItem("userId"),
    };
  }
  /**
   * removes the users saved data
   */
  removeData() {
    this.getStorage().removeItem("token");
    this.getStorage().removeItem("email");
  }
  /**
   * validates whether the users credentials are valid
   * @param {function} callback 
   */
  Validate(callback) {
    if (this.hasData()) {callback(false); return false }
    socket.emit("validate user", this.getData(), (response) => {
      callback(response.valid);
      return response.valid;
    });
  }
  /**
   * saves the user data in storage if the credentials are valid
   * @param {String} username 
   * @param {String} password 
   * @param {String} email 
   * @param {function} callback(boolean)
   */
  AddCheck(username, password, email, callback) {
    if (email == "" || email == " ") email = undefined;
    socket.emit("validate user", { username, password, email }, (response) => {
      //console.log(response);
      if (response.valid == true) {
        this.SaveData(response.username, password, response.email, response.userId);
      }
      if (callback) callback(response.valid);
      else return response.valid;
    });
  }
/**
 * creates the users account in the database if all options are filled
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {function} callback(response)
 */
  CreateAccount(username, password, email, callback) {
    socket.emit("signup", { username: username, password: password, email: email }, (response) => {
      //console.log(response);

      if (callback) callback(response);
      else return response;
    });
  }
}