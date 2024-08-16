import Game from "./Game";

const webtris = document.querySelector(".webtris")!;
const info = document.querySelector(".info")!;
const scoreBoard = document.querySelector(".score")!;
const lineCount = document.querySelector(".lines")!;
const level = document.querySelector(".level")!;
const nextShape = document.querySelector(".next-shape")!;

const modeDialog =
    document.querySelector<HTMLDialogElement>("dialog#game-mode")!;

const [soloButton, hostButton, joinButton] =
    modeDialog.querySelectorAll<HTMLButtonElement>("input[type='button']");

[soloButton, hostButton, joinButton].forEach((button) => {
    button.addEventListener("click", async (event) => {
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
                    const { host, onPlayerJoin } = await import(
                        "./helpers/socket"
                    );
                    const roomId = await host(playerName);

                    const awaitPlayersDialog =
                        document.querySelector<HTMLDialogElement>(
                            "dialog#await-players",
                        )!;

                    const roomIdElement =
                        awaitPlayersDialog.querySelector<HTMLSpanElement>(
                            "#room-id",
                        )!;
                    roomIdElement.textContent = roomId;

                    const playerList =
                        awaitPlayersDialog.querySelector<HTMLUListElement>(
                            "ul",
                        )!;

                    function addPlayerToList(playerName: string) {
                        const newPlayer = document.createElement("li");
                        newPlayer.textContent = playerName;
                        playerList.appendChild(newPlayer);
                    }

                    addPlayerToList(`${playerName} (host)`);
                    onPlayerJoin(addPlayerToList);

                    awaitPlayersDialog.showModal();
                });

                hostDialog.showModal();

                break;
            case "join":
                break;

            default:
                break;
        }
    });
});
