import * as http from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

export const app = express();
app.use(express.json());
app.use(cors());

export const server = http.createServer(app);
const io = new Server(server, { cors: { origin: [/.*/] } });
let latest = new Date();
let clockOn = true;
let lastToggle = latest;

setInterval(() => {
  if (clockOn) {
    latest = new Date();
    io.emit("tick", latest.toISOString());
  }
}, 5000);

app.post("/api/clockOn", (req, res) => {
  if (clockOn) {
    res.send({ toggled: false, since: lastToggle.toISOString() });
  } else {
    clockOn = !clockOn;
    const newToggle = new Date();
    const interval = newToggle.getTime() - lastToggle.getTime();
    lastToggle = new Date();
    io.emit("toggle", clockOn);
    res.send({ toggled: true, interval });
  }
});

app.post("/api/clockOff", (req, res) => {
  if (!clockOn) {
    res.send({ toggled: false, since: lastToggle.toISOString() });
  } else {
    clockOn = !clockOn;
    const newToggle = new Date();
    const interval = newToggle.getTime() - lastToggle.getTime();
    lastToggle = new Date();
    io.emit("toggle", clockOn);
    res.send({ toggled: true, interval });
  }
});
