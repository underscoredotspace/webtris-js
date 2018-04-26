export const shapes = [
  {
    type: 'l',
    start: 3,
    grid: [
      [1,1,1],
      [1,0,0]
    ]
  },
  {
    type: 'j',
    start: 3,
    grid: [
      [1,1,1],
      [0,0,1]
    ]
  },
  {
    type: 's',
    start: 3,
    grid: [
      [0,1,1],
      [1,1,0]
    ]
  },
  {
    type: 'z',
    start: 3,
    grid: [
      [1,1,0],
      [0,1,1]
    ]
  },
  {
    type: 't',
    start: 3,
    grid: [
      [1,1,1],
      [0,1,0]
    ]
  },
  {
    type: 'i',
    start: 3,
    grid: [
      [1,1,1,1]
    ]
  },{
    type: 'o',
    start: 4,
    grid: [
      [1,1],
      [1,1]
    ]
  }
]

export default class Shape {
  constructor() {
    const {type, grid, start} = this.randomShape()
    
    this.type = type
    this.grid = grid
    this.position = {x: start, y: 0}
  }

  randomShape() {
    const min = 0
    const max = shapes.length - 1
    const rnd = Math.floor(Math.random() * (max - min + 1) + min)

    return shapes[rnd]
  }

  move(x, y) {
    this.position.x += x
    this.position.y += y
  }

  rotateCCW() {
    const rows = this.grid.slice()
    const newRows = [...Array(rows[0].length)].map(e => Array(rows.length))

    for (let row in rows) {
      for (let col in rows[row]) {
        newRows[rows[0].length-col-1][row] = rows[row][col]
      }
    }

    this.grid = newRows
  }

  rotateCW() {
    this.rotateCCW()
    this.rotateCCW()
    this.rotateCCW()
    // const rows = this.grid.slice()
    // const newRows = [...Array(rows[0].length)].map(e => Array(rows.length))

    // for (let row in rows) {
    //   for (let col in rows[row]) {
    //     newRows[rows[0].length-col-1][row] = rows[row][col]
    //   }
    // }

    // this.grid = newRows
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