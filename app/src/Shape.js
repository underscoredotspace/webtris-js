export const shapes = [
  {
    type: 'l',
    start: 3,
    grid: [
      [1,1,1],
      [1,0,0]
    ],
    rotateFix: [
      {x:-1,y:1},
      {x:0,	y:-1},
      {x:0,	y:0},
      {x:1, y:0}
    ]
  },
  {
    type: 'j',
    start: 3,
    grid: [
      [1,1,1],
      [0,0,1]
    ],
    rotateFix: [
      {x:-1,y:1},
      {x:0,	y:-1},
      {x:0,	y:0},
      {x:1, y:0}
    ]
  },
  {
    type: 's',
    start: 3,
    grid: [
      [0,1,1],
      [1,1,0]
    ],
    rotateFix: [
      {x:0, y:1},
      {x:0, y:-1}
    ]
  },
  {
    type: 'z',
    start: 3,
    grid: [
      [1,1,0],
      [0,1,1]
    ],
    rotateFix: [
      {x:0, y:1},
      {x:0, y:-1}
    ]
  },
  {
    type: 't',
    start: 3,
    grid: [
      [1,1,1],
      [0,1,0]
    ],
    rotateFix: [
      {x:-1, y:1},
      {x:0, y:-1},
      {x:0, y:0},
      {x:1, y:0}
    ]
  },
  {
    type: 'i',
    start: 3,
    grid: [
      [1,1,1,1]
    ],
    rotateFix: [
      {x:-1, y:2},
      {x:1, y:-2}
    ]
  },{
    type: 'o',
    start: 4,
    grid: [
      [1,1],
      [1,1]
    ],
    rotateFix: [
      {x:-1, y:-2},
      {x:1, y:2}
    ]
  }
]

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

    this.grid = newRows

    this.position.x -= this.rotateFix[this.rotateFixPos].x
    this.position.y -= this.rotateFix[this.rotateFixPos].y
    
    this.rotateFixPos--
    if (this.rotateFixPos == -1) {this.rotateFixPos = this.rotateFix.length-1}
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

    this.grid = newRows

    this.rotateFixPos++
    if (this.rotateFixPos == this.rotateFix.length) {this.rotateFixPos = 0}

    this.position.x += this.rotateFix[this.rotateFixPos].x
    this.position.y += this.rotateFix[this.rotateFixPos].y
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