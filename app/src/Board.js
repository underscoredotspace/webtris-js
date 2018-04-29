import Shape from '../src/Shape'

export default class Board {
  constructor() {
    this.boardW = 10
    this.boardH = 19

    this.board = new Array(this.boardH*this.boardW).fill('x')
    this.shape = null
  }

  render() {
    let rows = this.rows()
    if (this.shape) {
      rows = this.shape.addTo(rows)
    }

    const boardHTML = ['<div class="board">']
    for (let row of rows) {
      boardHTML.push('\t<div class="row">\n')
      for (let block of row) {
        boardHTML.push(`\t\t<div class="block" type="${block}"></div>\n`)
      }
      boardHTML.push('\t</div>\n')
    }

    boardHTML.push('</div>')

    return boardHTML.join('')
  } 

  newShape() {
    this.shape = new Shape({w:this.boardW, h:this.boardH})
  }

  update() {
    const shape = this.shape
    if (shape.atBottom) {
      this.board = shape.addTo(this.rows()).reduce((acc, val) => acc.concat(val), [])
      this.newShape()
    } else {
      shape.move(0,1)
    }
  }
  
  rows() {
    let rows = []
    for (let row = 0; row <= this.boardH; row++) {
      const rowStart = row * (this.boardW-1)
      rows.push(
        this.board.slice(rowStart, rowStart+this.boardW)
      )
    }
    return rows
  }
  
  row(row) {
    const rowStart = row * (this.boardW-1)
    return this.board.slice(rowStart, rowStart+this.boardW)
  }
}