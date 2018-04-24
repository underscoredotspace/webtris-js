import Row from '../src/Row'

export default class Board {
  constructor() {
    this.rows = new Array(18).fill(new Row)
  }

  render() {
    const rowHTML = this.rows.map(row => row.render()).join('')
    return `<div class="board">\n\t${rowHTML}\n</div>`
  }
}