import Row from '../src/Row'

export default class Board {
  constructor() {
    this.rows = []

    for (let ndx = 0; ndx<=17; ndx++) {
      this.rows[ndx] = new Row()
    }
  }

  render() {
    const rowHTML = this.rows.map(row => row.render()).join('')
    return `<div class="board">\n\t${rowHTML}\n</div>`
  }
}