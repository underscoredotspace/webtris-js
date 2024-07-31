import shapes from "./shapes";
import { Vector } from "./types";

export default class Shape {
  public type: string;
  public pos: Vector;
  public grid: number[][];
  private rotateFix: Vector[];
  private rotateFixNdx: number = 0;

  constructor() {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    this.type = shape.type;
    this.grid = shape.grid;
    this.pos = { x: shape.start, y: 1 };
    this.rotateFix = shape.rotateFix;
  }

  public move(x: Vector["x"]) {
    this.pos.x += x;
  }

  public drop() {
    this.pos.y++;
  }

  public unDrop() {
    this.pos.y--;
  }

  public rotateCW() {
    if (this.type == "o") {
      return;
    }

    const grid = this.grid;
    const newGrid = [...Array(grid[0].length)].map((e) => Array(grid.length));

    grid.forEach((row, rowIndex) => {
      row.forEach((_col, colIndex) => {
        newGrid[colIndex][grid.length - rowIndex - 1] =
          grid[rowIndex][colIndex];
      });
    });

    this.grid = newGrid;

    this.rotateFixNdx++;
    if (this.rotateFixNdx >= this.rotateFix.length) {
      this.rotateFixNdx = 0;
    }

    this.pos.x += this.rotateFix[this.rotateFixNdx].x;
    this.pos.y += this.rotateFix[this.rotateFixNdx].y;
  }

  public rotateCCW() {
    if (this.type == "o") {
      return;
    }

    const grid = this.grid;
    const newGrid = [...Array(grid[0].length)].map((e) => Array(grid.length));

    grid.forEach((row, rowIndex) => {
      row.forEach((_col, colIndex) => {
        newGrid[grid[0].length - colIndex - 1][rowIndex] =
          grid[rowIndex][colIndex];
      });
    });

    this.grid = newGrid;

    this.pos.x -= this.rotateFix[this.rotateFixNdx].x;
    this.pos.y -= this.rotateFix[this.rotateFixNdx].y;

    this.rotateFixNdx--;
    if (this.rotateFixNdx < 0) {
      this.rotateFixNdx = this.rotateFix.length - 1;
    }
  }

  public render() {
    const boardHTML = ['<div class="board mini">'];
    for (let row of this.grid) {
      boardHTML.push('\t<div class="row">\n');

      for (let block of row) {
        boardHTML.push(
          `\t\t<div class="block" type="${block == 1 ? this.type : "x"}"></div>\n`,
        );
      }

      boardHTML.push("\t</div>\n");
    }

    boardHTML.push("</div>");

    return boardHTML.join("");
  }
}
