import { socket } from "./globals";
import { Device } from "@capacitor/device";

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
  async saveData(userData) {
    this.getStorage().setItem("SessionToken", userData.SessionToken);
    await Device.getId();
  }
  /**
   * saves the data to storage
   * @param {string} SessionToken
   */
  SaveData(SessionToken) {
    this.saveData({ SessionToken: SessionToken });
  }
  /**
   *
   * @returns checks if any data is saved in storage
   */
  hasData() {
    return this.getStorage().getItem("SessionToken") != null;
  }
  /** gets the users saved data */
  getData() {
    return {
      SessionToken: this.getStorage().getItem("SessionToken"),
      DeviceId: this.getStorage().getItem("_capuid"),
    };
  }
  /**
   * removes the users saved data
   */
  removeData() {
    localStorage.clear();
  }
  /**
   * validates whether the users credentials are valid
   * @param {function} callback
   * @returns {boolean} if the user is valid
   */
  Validate(callback) {
    socket.emit("validate user", this.getData(), callback);
  }
  /**
   * saves the user data in storage if the credentials are valid
   * @param {String} username
   * @param {String} password
   * @param {String} email
   * @param {function} callback(boolean)
   * @returns {boolean} if the user is valid
   */
  AddCheck(username, password, email, callback) {
    Validate((f) => {
      if (f.valid) {
        this.saveData({ SessionToken: f.token });
        return true
      }
      return false
    
    }) 
  }
  /**
   * creates the users account in the database if all options are filled
   * @param {String} username
   * @param {String} password
   * @param {String} email
   * @param {function} callback(response)
   */
  CreateAccount(username, password, email, callback) {}
}
