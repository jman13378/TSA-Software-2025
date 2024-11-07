import { Database } from "../database/database"
import { Server, Socket } from "socket.io";
export function run(io: Server, socket: Socket, db: Database) {
    socket.on('archiveInfo', (msg, callback) => {
        let json = JSON.parse(msg);
        let options = {
            email: json.email,
            name: json.name,
            state: json.state,
            userType: json.userType,
            orgName: json.orgName,
            chapterId: json.chapterId,
            password: json.password,
            rePassword: json.rePassword,
            pin: json.pin,
            chapterOption: json.chapterOption,
            studentId: json.studentId,
        }
        if (options.password != options.rePassword) {
            callback(false);
        }
        db.addUser(options.email, options.name,options.password,options.chapterId,options.email)
        callback(true);
    });
}; 