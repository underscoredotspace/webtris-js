import { BoardGrid, Size } from "./types";

export default class Board {
  private grid: BoardGrid = [];
  private size: Size;

  constructor(w = 10, h = 19) {
    this.grid = new Array(h).fill(new Array(w).fill("x"));
    this.size = { w, h };
  }

  public setGrid(board: BoardGrid) {
    this.grid = board;
  }

  public copy(): BoardGrid {
    return this.grid.map((row) => row.slice());
  }

  public clearFullRows(): number {
    let lines = 0;
    let newBoardGrid: BoardGrid = [];
    for (let row of this.grid) {
      if (row.includes("x")) {
        newBoardGrid.push(row.slice());
      } else {
        newBoardGrid.unshift(new Array(this.size.w).fill("x"));
        lines++;
      }
    }
    this.grid = newBoardGrid;
    return lines;
  }
}
