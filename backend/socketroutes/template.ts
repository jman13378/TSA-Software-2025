import {Database} from "../database/database"
import {Server, Socket } from "socket.io";
export function run(io: Server, socket:Socket, db:Database) {
        socket.on('validate user', (msg, callback) => {
    
        callback(true);
    });
}; 