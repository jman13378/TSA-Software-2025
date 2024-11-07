import {Database} from "../database/database"
import {Server, Socket } from "socket.io";
module.exports = function (io: Server, socket:Socket, db:Database) {
        socket.on('archiveInfo', (msg, callback) => {
            let json = JSON.parse(msg);
            let options = {
                email:json.email,
                name:json.name ,
                state:json.state ,
                userType:json.userType ,
                orgName:json.orgName ,
                chapterId:json.chapterId ,
                password: json.password ,
                rePassword:json.rePassword ,
                pin: json.pin ,
                chapterOption:json.chapterOption ,
                studentId:json.studentId ,
            }
if (options.password!=options.rePassword) {
    callback(false);
}
db.addUser(email,username,password)
        callback(true);
    });
}; 