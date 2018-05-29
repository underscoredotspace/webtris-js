import Board from "./Board";
import Shape from "./Shape";

export default class Game {
  constructor() {
    this.board = new Board
    this.shape = new Shape
    this.nextShape = new Shape
    this.score = 0
    this.lines = 0
    this.atBottom = false
  }

  merged() {
    const board = this.board.copy()
    const shape = this.shape

    for (let row in shape.grid){
      for (let col in shape.grid[row]) {
        if (shape.grid[row][col] == 1) {
          board[Number(row)+shape.pos.y][Number(col)+shape.pos.x] = shape.type
        }
      }
    }

    return board
  }

  render() {
    const rows = this.merged()

    const boardHTML = ['<div class="board">']
    for (let row of rows) {
      if (this.atBottom && !row.includes('x')) {
        boardHTML.push('\t<div class="row full">\n')
      } else {
        boardHTML.push('\t<div class="row">\n')
      }
      for (let block of row) {
        boardHTML.push(`\t\t<div class="block" type="${block}"></div>\n`)
      }
      boardHTML.push('\t</div>\n')
    }

    boardHTML.push('</div>')

    return boardHTML.join('')
} 
}