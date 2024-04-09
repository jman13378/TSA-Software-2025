let data = "./database/storage.db";
import { User, Profile } from "../models/User";

let db = require("better-sqlite3")(data);
function decodeBase64(data: string) {
  return Buffer.from(data, "base64").toString("ascii");
}
class Database {
  initialize() {
    /*
     * id
     * profile {displayname,avatar,roles,events,lastLogin}
     * username
     * email
     * password
     * admin
     * 
     *
     * */
    db.exec("CREATE TABLE IF NOT EXISTS users (" + 
    "UserId NUMERIC NOT NULL UNIQUE," + 
    "email TEXT NOT NULL UNIQUE," + 
    "username TEXT NOT NULL UNIQUE," + 
    "password TEXT NOT NULL," + 
    "profile TEXT NOT NULL);")
  
  }
  checkUserPassword() {
    
  }
  async addUser(email: string, username: string, password: string) {
    let stmt = db.prepare("INSERT INTO users(UserId,email,username,password,profile,lastLogin) VALUES(?,?,?,?,?);");
    stmt.run(Date.now(),JSON.stringify(
      {
      displayname:"",
      avatar:"",
      events:[],
      roles:{admin: false, parent: false, chaperone: false, advisor: false, developer: false},
      lastLogin:undefined
    }
    ),Date.now());
  }
  SetProfile(userProfile: User) {
    let stmt = db.prepare("UPDATE users SET profile = ? WHERE UserId = ?;");
    let pf = userProfile.build();
    stmt.run(pf, userProfile.getId());
  }
}
export { Database };