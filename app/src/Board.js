import Shape from '../src/Shape'
import shapes from '../src/shapes'

export default class Board {
  constructor(w, h) {
    debugger
    this.boardSize = {w, h}
    this.board = new Array(this.boardSize.h).fill(new Array(this.boardSize.w).fill('x'))
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
    this.shape = new Shape(this.boardSize, this.board)
  }

  removeFilledRows() {
    let lines = 0
    let rows = []
    for (let row of this.board) {
      if (row.includes('x')) {
        rows.push(row.slice())
      } else {
        rows.unshift(new Array(this.boardSize.w).fill('x'))
        lines++
      }
    }
    this.board = rows
    return lines
  }

  update() {
    const shape = this.shape
    let lines = 0
    if (shape.atBottom) {
      if (!shape.resetNext) {
        shape.resetNext = true
        return
      } 

      this.board = this.shape.addTo(this.rows())

      lines = this.removeFilledRows()

      this.newShape()
    } else {
      shape.move(0,1)
    }
    return lines
  }
  
  rows() {
    let rows = []
    for (let row of this.board) {
      rows.push(row.slice())
    }
    return rows
  }
}