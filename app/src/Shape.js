import shapes from './shapes'

export default class Shape {
  constructor(boardSize) {
    this.boardSize = boardSize
    this.atBottom = false

    const {type, grid, start, rotateFix} = this.randomShape()
    this.type = type
    this.grid = grid
    this.position = {x: start, y: 0}
    this.rotateFix = rotateFix
    this.rotateFixPos = 0
  }

  randomShape() {
    const min = 0
    const max = shapes.length - 1
    const rnd = Math.floor(Math.random() * (max - min + 1) + min)

    return shapes[rnd]
  }

  size() {
    return {
      w: this.grid[0].length,
      h: this.grid.length
    }
  }

  move(x, y) {
    if (y<0) { y=0 }

    const size = this.size()
    if ((x>0 && size.w + (this.position.x + x) <= this.boardSize.w) || (x<0 && this.position.x >0)) {
      this.position.x += x
    }

    if ((y >0 && size.h + (this.position.y + y) <= this.boardSize.h) || (y<0 && this.position.y >0)) {
      this.position.y += y
    }

    if (this.position.y+size.h == this.boardSize.h) {
      this.atBottom = true
    }
  }

  rotateCCW() {
    if (this.type == 'o') { return }
    
    const rows = this.grid.slice()
    const newRows = [...Array(rows[0].length)].map(e => Array(rows.length))

    for (let row in rows) {
      for (let col in rows[row]) {
        newRows[rows[0].length-col-1][row] = rows[row][col]
      }
    }

    this.position.x -= this.rotateFix[this.rotateFixPos].x
    this.position.y -= this.rotateFix[this.rotateFixPos].y

    this.rotateFixPos--
    if (this.rotateFixPos == -1) {this.rotateFixPos = this.rotateFix.length-1}

    this.correctPosition(newRows, () => {
      this.grid = newRows
    })
  }

  rotateCW() {
    if (this.type == 'o') { return }

    const rows = this.grid.slice()
    const newRows = [...Array(rows[0].length)].map(e => Array(rows.length))

    for (let row in rows) {
      for (let col in rows[row]) {
        newRows[col][rows.length-row-1] = rows[row][col]
      }
    }

    this.rotateFixPos++
    if (this.rotateFixPos == this.rotateFix.length) {this.rotateFixPos = 0}
    
    this.position.x += this.rotateFix[this.rotateFixPos].x
    this.position.y += this.rotateFix[this.rotateFixPos].y

    this.correctPosition(newRows, () => {
      this.grid = newRows
    })
  }

  correctPosition(newRows, cb) {
    if (this.position.x < 0) {
      this.position.x = 0
    }

    if ((this.position.x+newRows[0].length+1) > this.boardSize.w) {
      this.position.x = this.boardSize.w - newRows[0].length
    }
    cb()
  }

  addTo(rows) {
    for (let row in this.grid){
      for (let col in this.grid[row]) {
        if (this.grid[row][col] == 1) {
          rows[Number(row)+this.position.y][Number(col)+this.position.x] = this.type
        }
      }
    }

    return rows
  }
}