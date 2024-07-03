import { Database } from "./database/database"
import { Server } from "socket.io";
module.exports = function (io: Server, db: Database) {
  io.on('connection', (socket) => {
    require('./socketroutes/template')(io, socket, db);
    require('./socketroutes/chat')(io, socket, db);
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

  });
};