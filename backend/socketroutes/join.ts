import { Database } from "../database/database"
import { Server, Socket } from "socket.io";
export function run(io: Server, socket: Socket, db: Database) {
    socket.on('join', (msg, callback) => {
        msg = JSON.parse(msg);
        console.log(msg)
        socket.join(msg.body.Id);
    });
}; 