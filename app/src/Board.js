import Shape from '../src/Shape'

export default class Board {
  constructor() {
    this.board = new Array(18*10).fill('x')
    this.shape = new Shape()
  }

  render() {
    const rows = this.rows()
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
  
  rows() {
    let rows = []
    for (let row = 0; row <= 17; row++) {
      const rowStart = row * 9
      rows.push(
        this.board.slice(rowStart, rowStart+10)
      )
    }
    return rows
  }
  
  row(row) {
    const rowStart = row * 9
    return this.board.slice(rowStart, rowStart+10)
  }
}