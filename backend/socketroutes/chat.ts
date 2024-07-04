import {Database} from "../database/database"
import {Server, Socket } from "socket.io";
module.exports = function (io: Server, socket:Socket, db:Database) {
        socket.on('send message', (msg, callback) => {
            msg = JSON.parse(msg);
            console.log(socket.rooms)
            socket.in("lmao").emit('receive message', msg);
            console.log(msg)
        callback(true);
    });
}; 