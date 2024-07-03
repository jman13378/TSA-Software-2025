let data = "./database/storage.db";
import { compare, compareSync, genSalt, genSaltSync, getRounds, hash, hashSync } from 'bcrypt'
const saltRounds = 15; 
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
      "chapterId NUMERIC NOT NULL," +
      "lastLogin NUMERIC NOT NULL," +
      "phone TEXT NOT NULL," +
      "profile BLOB NOT NULL);")
    db.exec("CREATE TABLE IF NOT EXISTS chapters (" +
      "ChapterId NUMERIC NOT NULL UNIQUE," +
      "SchoolName TEXT NOT NULL UNIQUE," +
      "State TEXT NOT NULL," +
      "Roles BLOB NOT NULL," +
      "Settings BLOB NOT NULL," +
      "AdvisorId NUMERIC NOT NULL UNIQUE" +
      ");"
    )
    db.exec("CREATE TABLE IF NOT EXISTS messages (" + 
      "MessageId NUMERIC NOT NULL UNIQUE," +
      "ChapterId NUMERIC NOT NULL," +
      "UserId NUMERIC NOT NULL," +
      "Message TEXT NOT NULL" +
      ");"
    
    )
    /*db.exec("CREATE TABLE IF NOT EXISTS projectArchive (" + 
    "name TEXT NOT NULL UNIQUE," + 
    "spec TEXT NOT NULL UNIQUE," + 
    "members BLOB NOT NULL UNIQUE," + 
    "code BLOB NOT NULL," + 
    "other BLOB NOT NULL);")
  */
  }
  checkUserPassword() {

  }
  async createChapter(ChapterId:number,schoolName: string, state: string, roles: string[], settings: string[], advisorId: number) {
    let stmt = db.prepare("INSERT INTO chapters VALUES(?,?,?,?,?);");
    stmt.run(ChapterId, schoolName, state, JSON.stringify(roles), JSON.stringify(settings), advisorId);


  }
  async addUser(email: string, username: string, password: string) {
    let stmt = db.prepare("INSERT INTO users(UserId,email,username,password,profile,lastLogin) VALUES(?,?,?,?,?);");
    stmt.run(Date.now(), JSON.stringify(
      {
        displayname: "",
        avatar: "",
        events: [],
        roles: { admin: false, parent: false, chaperone: false, advisor: false, developer: false },
        lastLogin: undefined
      }
    ), Date.now());
  }
  SetProfile(userProfile: User) {
    let stmt = db.prepare("UPDATE users SET profile = ? WHERE UserId = ?;");
    let pf = userProfile.build();
    stmt.run(pf, userProfile.getId());
  }
}
export { Database };