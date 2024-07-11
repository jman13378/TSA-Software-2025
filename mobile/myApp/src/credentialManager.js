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
    this.getStorage().setItem("SessionToken", userData.SessionToken);
    
  }
  /**
   * saves the data to storage
   * @param {string} SessionToken
   */
  SaveData(SessionToken) {}
  /**
   *
   * @returns checks if any data is saved in storage
   */
  hasData() {return (this.getStorage().getItem("SessionToken")!=null)}
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
    this.getStorage().removeItem("SessionToken");
    this.getStorage().removeItem("_capuid");
  }
  /**
   * validates whether the users credentials are valid
   * @param {function} callback
   * @returns {boolean} if the user is valid
   */
  Validate(callback) {socket.emit("validate user", this.getData(), callback);}
  /**
   * saves the user data in storage if the credentials are valid
   * @param {String} username
   * @param {String} password
   * @param {String} email
   * @param {function} callback(boolean)
   */
  AddCheck(username, password, email, callback) {}
  /**
   * creates the users account in the database if all options are filled
   * @param {String} username
   * @param {String} password
   * @param {String} email
   * @param {function} callback(response)
   */
  CreateAccount(username, password, email, callback) {}
}
