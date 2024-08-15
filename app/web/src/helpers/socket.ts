import { io } from "socket.io-client";
import { saveRoom } from "./localStorage";

const socket = io();

socket.on("connect", () => {
    console.log("socket connected", socket.id);
});

if (process.env.NODE_ENV !== "production") {
    socket.onAny((event, ...args) => {
        console.log("DEBUG", event, args);
    });
}

export const host = (playerName: string): Promise<string> =>
    new Promise((resolve) => {
        if (playerName.length < 2) {
            return;
        }

        socket.on("host-room", (roomId) => {
            resolve(roomId);
        });

        socket.emit("host", playerName);
    });

export const join = async (roomId: string, playerName: string) => {
    if (roomId.length < 5 || playerName.length < 2) {
        return;
    }

    socket.on("join-room", (players) => {
        console.log("joined", players);
    });

    socket.emit("join", roomId, playerName);
    await saveRoom({ roomId });
};

export const getPlayers = () => {
    socket.emit("get-players");
};
