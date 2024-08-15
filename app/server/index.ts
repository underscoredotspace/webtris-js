import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import ViteExpress from "vite-express";
import { createRoom, getPlayersInRoom, joinRoom } from "./game";

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
    socket.on("host", async (playerName: string) => {
        try {
            const roomId = await createRoom(playerName, socket.id);

            socket.join(roomId);
            socket.emit("host-room", roomId);
        } catch (error) {
            socket.emit("error", error);
        }
    });

    socket.on("join", async (roomId: string, playerName: string) => {
        try {
            await joinRoom(roomId, playerName, socket.id);
            socket.join(roomId);
            socket.emit("join-room", roomId);
            socket.to(roomId).emit("player", playerName);
        } catch (error) {
            socket.emit("error", error);
        }
    });

    socket.on("get-players", (roomId: string) => {
        const players = getPlayersInRoom(roomId);

        if (players.size === 0) {
            socket.emit("error", "room does not exist");
        }

        socket.emit("players", players.values());
    });
});

server.listen(3005, () => {
    console.log("listening on *:3005");
});

ViteExpress.bind(app, server);
