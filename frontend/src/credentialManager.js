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
  }
  /**
   * saves the data to storage
   * @param {string} username 
   * @param {string} password 
   * @param {string} email 
   * @param {string} userId 
   */
  SaveData(username, password, email, userId) {
  }
  /**
   * 
   * @returns checks if any data is saved in storage
   */
  hasData() {
  }
  /** gets the users saved data */
  getData() {

  }
  /**
   * removes the users saved data
   */
  removeData() {

  }
  /**
   * validates whether the users credentials are valid
   * @param {function} callback 
   */
  Validate(callback) {

  }
  /**
   * saves the user data in storage if the credentials are valid
   * @param {String} username 
   * @param {String} password 
   * @param {String} email 
   * @param {function} callback(boolean)
   */
  AddCheck(username, password, email, callback) {

  }
/**
 * creates the users account in the database if all options are filled
 * @param {String} username 
 * @param {String} password 
 * @param {String} email 
 * @param {function} callback(response)
 */
  CreateAccount(username, password, email, callback) {

  }
}