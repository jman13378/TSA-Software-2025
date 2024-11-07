import { Database } from "./database/database"
import { Server } from "socket.io";
import fs from  "fs";
const excludeLoadList = ["template.ts", "login.ts"];  
export function run(io: Server, db: Database) {
  console.log("Socket is listening on port 300" );

  io.on('connection', (socket) => {
    for (let file of fs.readdirSync("./socketroutes")) {
      if (excludeLoadList.includes(file)) {
        console.log("Skipping " + file);
        continue;
      }
      try {
        let module = require("./socketroutes/"+file.replace(".ts",""))
        module.run(io, socket, db);
        console.log(file + " has been loaded");
      }
      catch (e) {
        console.log(e + `\nfile: ${file} could not be loaded`);
      }
    }

    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user  disconnected');
    });
  });
};