import { io } from "socket.io-client";
import { saveRoom } from "./localStorage";
import { Socket } from "socket.io";
import { RoomDetails } from "../../../types";

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

export const join = async (
    roomId: string,
    playerName: string,
): Promise<Array<RoomDetails>> =>
    new Promise(async (resolve, reject) => {
        if (roomId.length < 5 || playerName.length < 2) {
            return;
        }

        socket.on("join-room", (players: Array<RoomDetails>) => {
            resolve(players);
        });

        socket.on("error", (error) => {
            reject(error);
        });

        socket.emit("join", roomId, playerName);
        await saveRoom({ roomId });
    });

export const getPlayers = () => {
    socket.emit("get-players");
};

export const onPlayerJoin = (callback: (playerName: string) => void) => {
    socket.on("player-join", (playerName: string) => {
        callback(playerName);
    });
};

export const onPlayerLeave = (callback: (playerName: string) => void) => {
    socket.on("player-left", (playerName: string) => {
        callback(playerName);
    });
};
