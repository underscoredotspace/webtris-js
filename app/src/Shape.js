import shapes from './shapes';

export default class Shape {
  constructor() {
    const shape = shapes[Math.floor(Math.random() * shapes.length)]

    this.type = shape.type
    this.grid = shape.grid
    this.pos = {x: shape.start, y:2}
    this.rotateFix = shape.rotateFix
    this.rotateFixNdx = 0
  }

  move(x) {
    this.pos.x += x
  }

  drop() {
    this.pos.y++
  }

  unDrop() {
    this.pos.y--
  }

  rotateCW() {
    const grid = this.grid
    const newGrid = [...Array(grid[0].length)].map(e => Array(grid.length))

    for (let row in grid) {
      for (let col in grid[row]) {
        newGrid[col][grid.length-row-1] = grid[row][col]
      }
  }

    this.grid = newGrid

    this.rotateFixNdx++
    if (this.rotateFixNdx >= this.rotateFix.length) {this.rotateFixNdx = 0}

    this.pos.x += this.rotateFix[this.rotateFixNdx].x
    this.pos.y += this.rotateFix[this.rotateFixNdx].y
  }

  rotateCCW() {
    const grid = this.grid
    const newGrid = [...Array(grid[0].length)].map(e => Array(grid.length))

    for (let row in grid) {
      for (let col in grid[row]) {
        newGrid[grid[0].length-col-1][row] = grid[row][col]
      }
    }

    this.grid = newGrid

    this.pos.x -= this.rotateFix[this.rotateFixNdx].x
    this.pos.y -= this.rotateFix[this.rotateFixNdx].y

    this.rotateFixNdx--
    if (this.rotateFixNdx < 0) {this.rotateFixNdx = this.rotateFix.length-1}
  }
}