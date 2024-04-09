
import https from 'https'
import http, { IncomingMessage, ServerResponse } from "http"
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
import fs from 'fs'
const privateKey = fs.readFileSync("./ssl/key.txt", "utf8");
const certificate = fs.readFileSync("./ssl/cert.txt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const allowedIps = ["192.168.56.1", "10.90.9.5", "10.90.32.36", "192.168.68.131"];
for (let i = 0; i < allowedIps.length; i++) {
  allowedIps[i] = "http://" + allowedIps[i] + ":8080";
}

const corsOptions = {
  origin: ["https://tsa-software-2024.pages.dev","https://webapp.twetzel.com", "https://webpack-7xv.pages.dev", "http://192.168.56.1:8080", "http://localhost:8080/", "http://localhost:5173/", ...allowedIps],
  credentials: true,  
};
var app = https.createServer(credentials, server);
const io = new Server(app);
const socket = require("./socket")(io, db);

app.listen(80);
console.log('Server running on port 80');