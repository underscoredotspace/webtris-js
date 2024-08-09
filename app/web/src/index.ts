import Game from "./Game";

const webtris = document.querySelector(".webtris")!;
const info = document.querySelector(".info")!;
const scoreBoard = document.querySelector(".score")!;
const lineCount = document.querySelector(".lines")!;
const level = document.querySelector(".level")!;
const nextShape = document.querySelector(".next-shape")!;

const dialog = document.querySelector<HTMLDialogElement>("dialog#game-mode")!;

const [soloButton, hostButton, joinButton] =
  dialog.querySelectorAll<HTMLButtonElement>("input");

[soloButton, hostButton, joinButton].forEach((button) => {
  button.addEventListener("click", async (event) => {
    switch (button.id) {
      case "solo":
        const game = new Game(
          info,
          webtris,
          scoreBoard,
          lineCount,
          level,
          nextShape,
        );
        game.start();
        dialog.close();
        break;

      case "host":
        const { host } = await import("./helpers/socket");
        // connect to socket
        const room = await host();
        console.log("You created game", room);
        break;
      // store room id
      // receive each player's name via socket
      // start game when ready via socket
      case "join":
      // enter room id
      // enter player name
      // connect to socket
      // send room id and name via socket
      // wait for game to start
      default:
        alert("not yet available. sorry!");
        break;
    }
  });
});
