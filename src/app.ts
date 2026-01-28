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
let count = 0;

setInterval(() => {
  latest = new Date();
  io.emit("tick", { time: latest.toISOString(), watchers: io.engine.clientsCount });
}, 4000);

app.get("/api/status", (req, res) => {
  res.send({ currentTick: latest.toISOString(), currentCount: count });
});

app.post("/api/poke", (req, res) => {
  count += 1;
  io.emit("count", { count, watchers: io.engine.clientsCount });
  res.send({ success: true });
});
