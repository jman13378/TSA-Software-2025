import https from 'https';
import express, { Router, request as req, response as res, Application } from 'express';
import { Server } from 'socket.io';
import { Database } from './database/database';
import fs from 'fs';
import cors from 'cors';

const app: Application = express();
const db = new Database();
db.initialize();

const privateKey = fs.readFileSync('./ssl/key.txt', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.txt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const allowedIps = ["192.168.56.1", "10.90.9.5", "10.90.32.36", "192.168.68.131", "192.168.86.53"];
for (let i = 0; i < allowedIps.length; i++) {
  allowedIps[i] = "http://" + allowedIps[i] + ":8080";
}

const corsOptions = {
  origin: ["localhost",
    "chaptercore.pages.dev",
     "chaptercore.org",
    "https://chaptercore.org",

    "https://app.chaptercore.org",
    "https://webpack-7xv.pages.dev",
    "http://192.168.56.1:8080",
    "http://localhost:8080",
    "http://localhost:5173",
    ...allowedIps],
  credentials: true,
};
app.use(cors(corsOptions)); // Enable CORS with the specified options

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', corsOptions.origin.join(','));
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
const settingsRoute = require("./routes/checkout")

app.use('/payments', settingsRoute)






const server = https.createServer(credentials, app);
const io = new Server(server, {
  cors: {
    origin: corsOptions.origin,
    credentials: corsOptions.credentials,
  },
  allowEIO3: true,

});
import { run } from './socket';
run(io, db);
server.listen(3000, "0.0.0.0", () => {
  console.log(server.address())
  console.log('Server running on port 80');
});
