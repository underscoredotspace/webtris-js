import shapes from './shapes'

export default class Shape {
  constructor(boardSize) {
    this.boardSize = boardSize
    this.atBottom = false
    this.resetNext = false

    const {type, grid, start, rotateFix} = this.randomShape()
    this.type = type
    this.grid = grid
    this.position = {x: start, y: 2}
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
    const position = this.position
    const boardSize = this.boardSize

    if ((x>0 && size.w + (position.x + x) <= boardSize.w) || (x<0 && position.x >0)) {
      position.x += x
    }

    if ((y >0 && size.h + (position.y + y) <= boardSize.h)) {
      position.y += y
    }

    if (position.y+size.h == boardSize.h) {
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

    const newPosition = {
      x: this.position.x - this.rotateFix[this.rotateFixPos].x,
      y: this.position.y - this.rotateFix[this.rotateFixPos].y
    }

    let newRotateFixPos =  this.rotateFixPos-1
    if (newRotateFixPos == -1) {newRotateFixPos = this.rotateFix.length-1}

    if (this.positionOk(newRows, newPosition)) {
      this.grid = newRows
      this.position = Object.assign({}, newPosition)
      this.rotateFixPos = newRotateFixPos
    }
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

    let newRotateFixPos = this.rotateFixPos+1
    if (newRotateFixPos == this.rotateFix.length) {newRotateFixPos = 0}
    
    const newPosition = {
      x: this.position.x + this.rotateFix[newRotateFixPos].x,
      y: this.position.y + this.rotateFix[newRotateFixPos].y
    }

    if (this.positionOk(newRows, newPosition)) {
      this.grid = newRows
      this.position = Object.assign({}, newPosition)
      this.rotateFixPos = newRotateFixPos
    }
  }

  positionOk(newRows, newPosition) {
    if ((newPosition.x < 0) || (newPosition.x+newRows[0].length) > this.boardSize.w) {
      return false
    }

    if (newPosition.y+newRows.length > this.boardSize.h) {
      newPosition.y = this.boardSize.h - newRows.length
    }

    return true
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