import Shape from '../src/Shape'
import shapes from '../src/shapes'

export default class Board {
  constructor() {
    this.boardSize = {w: 10, h: 19}

    this.board = []
    for (let y=0; y<this.boardSize.h; y++) {
      this.board.push([])
      for (let x=0; x<this.boardSize.w; x++) {
        this.board[y].push('x')
      }
    }

    this.shape = null
    this.newShape()
  }

  render() {
    const rows = this.shape.addTo(this.rows())

    const boardHTML = ['<div class="board">']
    for (let row of rows) {
      if (this.shape.atBottom && !row.includes('x')) {
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

  newShape() {
    this.shape = new Shape(this.boardSize)
  }

  removeFilledRows() {
    let rows = []
    for (let row of this.board) {
      if (row.includes('x')) {
        rows.push(row.slice())
      } else {
        rows.unshift(new Array(this.boardSize.w).fill('x'))
      }
    }
    this.board = rows
  }

  update() {
    const shape = this.shape
    if (shape.atBottom) {
      if (!shape.resetNext) {
        shape.resetNext = true
        return
      } 

      this.board = this.shape.addTo(this.rows())

      this.removeFilledRows()

      this.newShape()
    } else {
      shape.move(0,1)
    }
  }
  
  rows() {
    let rows = []
    for (let row of this.board) {
      rows.push(row.slice())
    }
    return rows
  }
}