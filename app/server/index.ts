import express from "express";
import path from "node:path";
import http from "node:http";
import { Server } from "socket.io";
import ViteExpress from "vite-express";
import shortUniqueId from "short-unique-id";

const id = new shortUniqueId();
const generate = () => id.rnd();

ViteExpress.config({
  inlineViteConfig: {
    root: "app/web",
    build: { outDir: "../../dist" },
  },
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("host", () => {
    if (socket.rooms.size >= 2) {
      socket.emit("error", "Already in a game", [...socket.rooms.values()][1]);
      return;
    }

    const roomId = generate();
    socket.join(roomId);
    socket.emit("room", roomId);
  });
});

server.listen(3005, () => {
  console.log("listening on *:3005");
});

ViteExpress.bind(app, server);
