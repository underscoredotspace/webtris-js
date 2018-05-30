import Board from "./Board";
import Shape from "./Shape";

export default class Game {
  constructor(boardElement, scoreElement, nextShapeElement) {
    this.boardElement = boardElement
    this.scoreElement = scoreElement
    this.nextShapeElement = nextShapeElement

    this.board = new Board
    this.shapeQueue = [new Shape, new Shape]
    this.shape = this.shapeQueue[0]
    this.nextShape = this.shapeQueue[1]
    this.score = 0
    this.lines = 0

    this.lastUpdate = 0
    this.updateInterval = 1000

    this.addEventListeners()
    this.updateNextShapeElement()

    this.update = this.update.bind(this)
    this.start = this.update
  }

  selectNextshape() {
    this.board.grid = this.merged()
    this.shapeQueue.shift()
    this.shapeQueue.push(new Shape)
    this.shape = this.shapeQueue[0]
    this.nextShape = this.shapeQueue[1]

    this.updateNextShapeElement()
  }

  updateNextShapeElement() {
    this.nextShapeElement.innerText = this.nextShape.type
  }

  collides() {
    if ((this.shape.pos.y + this.shape.size().y > this.board.size.h) ||
      (this.shape.pos.x + this.shape.size().x > this.board.size.w) ||
      (this.shape.pos.x < 0) || (this.shape.pos.y < 0)
    ) {
      return true
    }

    return false
  }

  merged() {
    const board = this.board.copy()
    const shape = this.shape

    for (let row in shape.grid){
      for (let col in shape.grid[row]) {
        if (shape.grid[row][col] == 1) {
          const [x, y] = [Number(col)+shape.pos.x, Number(row)+shape.pos.y]
          if (!board[y] || !board[y][x] || board[y][x] != 'x') { return false}
          board[y][x] = shape.type
        }
      }
    }

    return board
  }

  plummet() {
    let ok = true

    while (ok) {
      this.shape.drop()
      if (!this.merged() || this.collides()) {
        ok = false
      }
    }

    this.shape.unDrop()
    this.selectNextshape()
  }

  update(time = 0) {
    if (time - this.lastUpdate > this.updateInterval) {
      this.shape.drop()
      const merged = this.merged()
      if (!this.collides() && merged) {
        this.boardElement.innerHTML = this.render(merged)
      } else {
        this.shape.unDrop()
        this.selectNextshape()
      }

      this.lastUpdate = time
    }

    requestAnimationFrame(this.update)
  }

  render(merged) {
    const boardHTML = ['<div class="board">']
    for (let row of merged) {
      if (!row.includes('x')) {
        boardHTML.push('\t<div class="row full">\n')
      } else {
        boardHTML.push('\t<div class="row">\n')
      }
      for (let block of row) {
        boardHTML.push(`\t\t<div class="block" type="${block}"></div>\n`)
      }
      boardHTML.push('\t</div>\n')
    }

    boardHTML.push('</div>')

    return boardHTML.join('')
  }

  addEventListeners() {
    window.addEventListener('keydown', e => {
      const key = e.key
      switch(key) {
        case 'ArrowLeft': this.shape.move(-1); break
        case 'ArrowRight': this.shape.move(1); break
        case ' ': this.plummet(); break
      }

      this.boardElement.innerHTML = this.render(this.merged())
    })
  }
}