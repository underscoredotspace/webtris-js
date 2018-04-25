import Row from '../src/Row'
import Shape from '../src/Shape'

export default class Board {
  constructor() {
    this.rows = []
    this.shape = new Shape()

    for (let ndx = 0; ndx<=17; ndx++) {
      this.rows[ndx] = new Row()
    }
  }

  drop() {
    this.shape.move(0,1)
  }

  render() {
    if (this.shape) {rows = this.shape.render(this.rows)}
    const rowsHTML = rows.map(row => row.render()).join('')
    return `<div class="board">\n\t${rowsHTML}\n</div>`
  }  
}