import { io } from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  console.log("socket connected", socket.id);
});

socket.onAny((event, ...args) => {
  console.log("DEBUG", event, args);
});

export const host = (): Promise<string> =>
  new Promise((resolve) => {
    socket.on("room", (message) => {
      resolve(message);
      console.log("room", message);
    });

    socket.emit("host");
  });
