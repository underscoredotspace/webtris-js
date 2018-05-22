import shapes from './shapes'

export default class Shape {
  constructor(boardSize, board) {
    this.atBottom = false
    this.resetNext = false

    this.boardSize = boardSize
    this.board = board

    const {type, grid, start, rotateFix} = this.randomShape()
    this.type = type
    this.grid = grid
    this.position = {x: start, y: 2}
    this.rotateFix = rotateFix
    this.rotateFixPos = 0

    if (!this.positionOk(this.grid, this.position)) {
      this.gameover = true
    }
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

  plummet() {
    while (!this.resetNext) {
      this.move(0,1)
    }
  }

  move(x, y) {
    if (this.resetNext) { return }
    if (y<0) { y=0 }

    const newPosition = {
      x: this.position.x + x,
      y: this.position.y + y
    }

    if (this.positionOk(this.grid, newPosition)) {
      this.position = Object.assign({}, newPosition)
      this.atBottom = false
      this.resetNext = false
    } else if (y == 1) {
      if (this.atBottom) {
        this.resetNext = true
        return
      }
      this.atBottom = true
      return
    }

    this.checkBottom()
  }

  rotateCCW() {
    if (this.resetNext) { return }
    if (this.type == 'o') { return }

    
    const grid = this.grid.slice()
    const newGrid = [...Array(grid[0].length)].map(e => Array(grid.length))

    for (let row in grid) {
      for (let col in grid[row]) {
        newGrid[grid[0].length-col-1][row] = grid[row][col]
      }
    }

    const newPosition = {
      x: this.position.x - this.rotateFix[this.rotateFixPos].x,
      y: this.position.y - this.rotateFix[this.rotateFixPos].y
    }

    let newRotateFixPos =  this.rotateFixPos-1
    if (newRotateFixPos == -1) {newRotateFixPos = this.rotateFix.length-1}

    if (this.positionOk(newGrid, newPosition)) {
      this.grid = newGrid
      this.position = Object.assign({}, newPosition)
      this.rotateFixPos = newRotateFixPos
    }

    this.checkBottom()
  }

  rotateCW() {
    if (this.resetNext) { return }
    if (this.type == 'o') { return }

    const grid = this.grid.slice()
    const newGrid = [...Array(grid[0].length)].map(e => Array(grid.length))

    for (let row in grid) {
      for (let col in grid[row]) {
        newGrid[col][grid.length-row-1] = grid[row][col]
      }
    }

    let newRotateFixPos = this.rotateFixPos+1
    if (newRotateFixPos == this.rotateFix.length) {newRotateFixPos = 0}
    
    const newPosition = {
      x: this.position.x + this.rotateFix[newRotateFixPos].x,
      y: this.position.y + this.rotateFix[newRotateFixPos].y
    }

    if (this.positionOk(newGrid, newPosition)) {
      this.grid = newGrid
      this.position = Object.assign({}, newPosition)
      this.rotateFixPos = newRotateFixPos
    }

    this.checkBottom()
  }

  positionOk(grid, position) {
    if ((position.x < 0) || (position.x+grid[0].length) > this.boardSize.w) {
      return false
    }

    if (position.y+grid.length > this.boardSize.h) {
      return false
    }

    for (let row in grid) {
      for (let col in grid[row]) {
        if (grid[row][col] === 0) { continue }
        if (this.board[Number(row)+position.y][Number(col)+position.x] != 'x') {
          return false
        }
      }
    }

    return true
  }

  checkBottom() {
    const size = this.size()
    let position = this.position
    const boardSize = this.boardSize

    if (position.y+size.h == boardSize.h) {
      this.atBottom = true
    } else {
      this.atBottom = false
      this.resetNext = false
    }
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