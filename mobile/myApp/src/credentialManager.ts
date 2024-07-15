import { socket } from "./globals";
import { Device } from "@capacitor/device";
export class Creds {
  constructor() { }
  encodeBase64(data: string) {
    return btoa(data);
  }
  decodeBase64(data: string) {
    return atob(data);
  }
  getStorage() {
    return window.localStorage;
  }
  /**
   * saves the users data in storage
   * @param {JSON} userData
   */
  async saveData(userData: { SessionToken: string }) {
    await Device.getId();
    this.getStorage().setItem("SessionToken", userData.SessionToken);

  }
  /**
   * saves the data to storage
   * @param {string} SessionToken
   */
  SaveData(SessionToken: string) { this.saveData({ SessionToken }); }
  /**
   *
   * @returns checks if any data is saved in storage
   */
  hasData() { return (this.getStorage().getItem("SessionToken") != null) }
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
  Validate(callback: Function) { socket.emit("validate user", this.getData(), callback); }
  /**
   * saves the user data in storage if the credentials are valid
   * @param {function} callback(boolean)
   */
  AddCheck(username: string, password: string, email: string, callback: Function) { }
  /**
   * creates the users account in the database if all options are filled
   * @param {function} callback(response)
   */
  CreateAccount(options: Object, callback: Function) {
    socket.emit("create account", options, (response:Object) => {
      //console.log(response);

      if (callback) callback(response);
      else return response;
    });
  }
}
