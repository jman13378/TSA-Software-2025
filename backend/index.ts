
import http, { IncomingMessage, ServerResponse } from 'http'
import { Server } from 'socket.io'
import { Database } from "./database/database"
const db = new Database();
db.initialize();
function server(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: "404 Doesn't exist",
  }));
}
const app = http.createServer(server);
const io = new Server(app);
const socket = require("./routes/socket/socket")(io, db);

app.listen(80);
console.log('Server running on port 80');