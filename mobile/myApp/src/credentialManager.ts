import { socket } from "./globals";
import { Device } from "@capacitor/device";

export class Creds {
  constructor() { }

  /**
   * Encodes a string to Base64.
   * @param {string} data - The string data to be encoded.
   * @returns {string} - The Base64 encoded string.
   */
  encodeBase64(data: string) {
    return btoa(data);
  }

  /**
   * Decodes a Base64 string.
   * @param {string} data - The Base64 encoded string.
   * @returns {string} - The decoded string.
   */
  decodeBase64(data: string) {
    return atob(data);
  }

  /**
   * Returns the local storage object.
   * @returns {Storage} - Local storage for the current window.
   */
  getStorage() {
    return window.localStorage;
  }

  /**
   * Saves the user's data in local storage.
   * @param {Object} userData - The user's data to be saved.
   * @param {string} userData.SessionToken - The session token to be saved.
   */
  async saveData(userData: { SessionToken: string }) {
    await Device.getId();
    // Fetch the device ID (asynchronously).
    this.getStorage().setItem("SessionToken", userData.SessionToken);
    // Save the session token in local storage.
  }

  /**
   * Saves the session token in local storage.
   * @param {string} SessionToken - The session token to be saved.
   */
  SaveData(SessionToken: string) {
    this.saveData({ SessionToken });
  }

  /**
   * Checks if any user data is saved in local storage.
   * @returns {boolean} - True if a session token exists, false otherwise.
   */
  hasData() {
    return this.getStorage().getItem("SessionToken") != null;
  }

  /**
   * Retrieves the user's saved data.
   * @returns {Object} - An object containing the session token and device ID.
   */
  getData() {
    return {
      SessionToken: this.getStorage().getItem("SessionToken"),
      DeviceId: this.getStorage().getItem("_capuid"),
      // Retrieve both session token and device ID from local storage.
    };
  }

  /**
   * Removes the user's saved data from local storage.
   */
  removeData() {
    this.getStorage().removeItem("SessionToken");
    this.getStorage().removeItem("_capuid");
    // Remove session token and device ID from local storage.
  }

  /**
   * Validates the user's credentials by emitting an event to the server.
   * @param {Function} callback - The callback function to be called upon validation response.
   */
  Validate(callback: Function) {
    socket.emit("validate user", this.getData(), callback);
    // Emit "validate user" event with user data and call the callback function.
  }

  /**
   * Placeholder function for adding a check to save user data if credentials are valid.
   * @param {string} username - The username to check.
   * @param {string} password - The password to check.
   * @param {string} email - The email to check.
   * @param {Function} callback - The callback function to be called upon completion.
   */
  AddCheck(username: string, password: string, email: string, callback: Function) {
    // This function is currently a placeholder for adding user checks.
  }

  /**
   * Creates a user's account in the database.
   * @param {Object} options - The account creation options.
   * @param {Function} callback - The callback function to be called upon completion.
   */
  CreateAccount(options: Object, callback: Function) {
    socket.emit("create account", options, (response: Object) => {
      // Emit "create account" event with options and process the response.
      if (callback) callback(response);
      else return response;
    });
  }
}