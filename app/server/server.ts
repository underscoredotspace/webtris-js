import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import { createRoom, getPlayersInRoom, joinRoom, leaveRoom } from "./game";

export const app = express();
export const server = http.createServer(app);
const io = new Server(server, { pingInterval: 1000, pingTimeout: 2000 });

app.get("/helth", (_, res) => {
    res.send(Date.now().toString());
});

io.on("connection", (socket) => {
    socket.on("disconnect", async () => {
        try {
            const player = await leaveRoom(socket.id);
            socket.to(player.room_id).emit("player-left", player.name);
        } catch (error) {
            console.error("disconnect", error);
        }
    });

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
            const players = await joinRoom(roomId, playerName, socket.id);

            socket.join(roomId);
            socket.emit("join-room", players);
            socket.to(roomId).emit("player-join", playerName);
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
