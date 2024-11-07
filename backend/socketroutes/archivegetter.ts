import {Database} from "../database/database"
import {Server, Socket } from "socket.io";
export function run(io: Server, socket:Socket, db:Database) {
        socket.on('archiveInfo', (msg, callback) => {
    


            let calls = {
                spec: [],
                other: [],
                code: []
            }
        callback();
    });
}; 