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
    this.updateInterval = 300
    this.paused = false

    this.addEventListeners()
    this.updateNextShape()
    this.updateScore()
    this.updateLines()

    this.update = this.update.bind(this)
    this.start = this.update
  }

  resetBoard() {
    this.board.grid = this.merged()
    const lines = this.board.clearFullRows()

    this.updateScore(lines)
    this.updateLines(lines)
    this.updateNextShape()

    if (this.collides()) {
      this.draw()
      alert('oh bugger!')
      this.board = new Board
      this.shapeQueue = [new Shape, new Shape]
      this.updateScore(-this.score)
      this.updateLines(-this.lines)
      this.lastUpdate = 0
    }
  }

  updateScore(lines = 0) {
    this.score += lines
    this.scoreElement.innerText = this.score
  }

  updateLines(lines = 0) {
    this.lines += lines
    // this.linesElement.innerText = this.lines
  }

  updateNextShape() {
    this.shapeQueue.shift()
    this.shapeQueue.push(new Shape)
    this.shape = this.shapeQueue[0]
    this.nextShape = this.shapeQueue[1]
    this.nextShapeElement.innerText = this.nextShape.type
  }

  collides() {
    const board = this.board.copy()
    const shape = this.shape

    for (let row in shape.grid){
      for (let col in shape.grid[row]) {
        if (shape.grid[row][col] == 0) { continue }

        const [y,x] = [Number(row)+shape.pos.y, Number(col)+shape.pos.x]
        // debugger
        if (!board[y] || !board[y][x] || board[y][x]!='x') {
          return true
        }
      }
    }

    return false
  }

  merged() {
    const board = this.board.copy()
    const shape = this.shape

    for (let row in shape.grid){
      for (let col in shape.grid[row]) {
        if (shape.grid[row][col] == 1) {
          board[Number(row)+shape.pos.y][Number(col)+shape.pos.x] = shape.type
        }
      }
    }

    return board
  }

  plummet() {
    do {
      this.shape.drop()
    } while (!this.collides())

    this.shape.unDrop()
    this.lastUpdate = performance.now() - this.updateInterval
  }

  update() {
    const time = performance.now()
    requestAnimationFrame(() => this.update(time))
    if (this.paused || time - this.lastUpdate < this.updateInterval) { return }
    this.lastUpdate = time

    this.shape.drop()
    if (this.collides()) {
      this.shape.unDrop()
      this.resetBoard()
    }

    this.draw()
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

  draw() {
    this.boardElement.innerHTML = this.render(this.merged())
  }

  addEventListeners() {
    window.addEventListener('keydown', e => {
      const key = e.key

      if (key == 'p') {
        this.paused = !this.paused
      }

      if (this.paused) { return }

      switch(key) {
        case 'ArrowLeft': 
          this.shape.move(-1)
          if (this.collides() || this.merged()==false) {this.shape.move(1)}
          break
        case 'ArrowRight': 
          this.shape.move(1)
          if (this.collides() || this.merged()==false) {this.shape.move(-1)}
          break
        case 'z': 
          this.shape.rotateCCW()
          if (this.collides() || this.merged()==false) {this.shape.rotateCW()}
          break
        case 'x': 
          this.shape.rotateCW()
          if (this.collides() || this.merged()==false) {this.shape.rotateCCW()}
          break
        case ' ': 
          this.plummet()
          break
      }

      this.draw()
    })
  }
}