export default class Board {
  constructor(w = 10, h = 19) {
    this.grid = new Array(h).fill(new Array(w).fill('x'))
    this.size = {w,h}
  }

  copy() {
    return this.grid.map(row => row.slice())
  }

  clearFullRows() {
    let lines = 0
    let rows = []
    for (let row of this.grid) {
      if (row.includes('x')) {
        rows.push(row.slice())
      } else {
        rows.unshift(new Array(this.size.w).fill('x'))
        lines++
      }
    }
    this.grid = rows
    return lines
  }
}