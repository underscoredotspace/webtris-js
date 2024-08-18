import e from "express";
import Game from "./Game";
import { RoomDetails, RoomId } from "../../types";

const webtris = document.querySelector(".webtris")!;
const info = document.querySelector(".info")!;
const scoreBoard = document.querySelector(".score")!;
const lineCount = document.querySelector(".lines")!;
const level = document.querySelector(".level")!;
const nextShape = document.querySelector(".next-shape")!;

const modeDialog =
    document.querySelector<HTMLDialogElement>("dialog#game-mode")!;

if (process.env.NODE_ENV !== "production") {
    modeDialog.close();
    const game = new Game(
        info,
        webtris,
        scoreBoard,
        lineCount,
        level,
        nextShape,
    );
    game.start();
    setTimeout(() => {
        game.pause();
    }, 700);
}

const [soloButton, hostButton, joinButton] =
    modeDialog.querySelectorAll<HTMLButtonElement>("input[type='button']");

interface AwaitPlayersProps {
    roomId: RoomId;
    hostName?: string;
    roomDetails?: RoomDetails[];
}
async function awaitPlayers({
    roomId,
    hostName,
    roomDetails,
}: AwaitPlayersProps) {
    const { onPlayerJoin, onPlayerLeave } = await import("./helpers/socket");

    const awaitPlayersDialog = document.querySelector<HTMLDialogElement>(
        "dialog#await-players",
    )!;

    const roomIdElement =
        awaitPlayersDialog.querySelector<HTMLSpanElement>("#room-id")!;
    roomIdElement.textContent = roomId;

    const playerList =
        awaitPlayersDialog.querySelector<HTMLUListElement>("ul")!;

    function addPlayerToList(playerName: string, isHost?: boolean) {
        const newPlayer = document.createElement("li");
        newPlayer.textContent = playerName;
        isHost && newPlayer.classList.add("host");
        playerList.appendChild(newPlayer);
    }

    function removePlayerFromList(playerName: string) {
        const players = Array.from(playerList.querySelectorAll("li"));
        const playerElement = players.find(
            (player) => player.textContent === playerName,
        );

        playerElement?.remove();
    }

    if (hostName) {
        const startGameButton = awaitPlayersDialog.querySelector(
            "button[type='submit'][hidden]",
        )!;

        startGameButton.removeAttribute("hidden");
        addPlayerToList(hostName, true);

        const awaitDialogForm =
            awaitPlayersDialog.querySelector<HTMLFormElement>("form")!;

        awaitDialogForm.addEventListener("submit", () => {});
    }
    if (roomDetails) {
        roomDetails.forEach(({ playerName, isHost }) => {
            addPlayerToList(playerName, isHost);
        });
    }
    onPlayerJoin(addPlayerToList);
    onPlayerLeave(removePlayerFromList);

    awaitPlayersDialog.showModal();
}

[soloButton, hostButton, joinButton].forEach((button) => {
    button.addEventListener("click", async () => {
        switch (button.id) {
            case "solo":
                modeDialog.close();
                const game = new Game(
                    info,
                    webtris,
                    scoreBoard,
                    lineCount,
                    level,
                    nextShape,
                );
                game.start();
                break;

            case "host":
                modeDialog.close();
                const hostDialog =
                    document.querySelector<HTMLDialogElement>(
                        "dialog#host-game",
                    )!;

                const hostDialogForm =
                    hostDialog.querySelector<HTMLFormElement>("form")!;

                hostDialogForm.addEventListener("submit", async (event) => {
                    if (!(event.currentTarget instanceof HTMLFormElement)) {
                        return;
                    }

                    const formData = new FormData(event.currentTarget);
                    const playerName =
                        formData.get("player-name")?.toString() ?? "";
                    if (playerName?.length < 3) {
                        return;
                    }
                    const { host } = await import("./helpers/socket");
                    const roomId = await host(playerName);

                    awaitPlayers({ roomId, hostName: playerName });
                });

                hostDialog.showModal();

                break;
            case "join":
                modeDialog.close();
                const joinDialog =
                    document.querySelector<HTMLDialogElement>(
                        "dialog#join-game",
                    )!;

                const joinDialogForm =
                    joinDialog.querySelector<HTMLFormElement>("form")!;

                joinDialogForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    if (!(event.currentTarget instanceof HTMLFormElement)) {
                        return;
                    }

                    const formData = new FormData(event.currentTarget);
                    const playerName =
                        formData.get("player-name")?.toString() ?? "";
                    if (playerName?.length < 3) {
                        return;
                    }

                    const roomId = formData.get("room-id")?.toString() ?? "";
                    if (roomId?.length < 5) {
                        return;
                    }

                    const { join } = await import("./helpers/socket");

                    try {
                        const roomDetails = await join(roomId, playerName);
                        awaitPlayers({ roomId, roomDetails });
                        joinDialog.close();
                    } catch (error) {
                        console.log(error);
                    }
                });

                joinDialog.showModal();
                break;

            default:
                break;
        }
    });
});
