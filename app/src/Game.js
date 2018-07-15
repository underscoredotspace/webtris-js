import Board from "./Board";
import Shape from "./Shape";

export default class Game {
  constructor(boardElement, scoreElement, linesElement, levelElement, nextShapeElement) {
    this.boardElement = boardElement
    this.scoreElement = scoreElement
    this.linesElement = linesElement
    this.levelElement = levelElement
    this.nextShapeElement = nextShapeElement

    this.board = new Board
    this.shapeQueue = [new Shape, new Shape]
    this.shape = this.shapeQueue[0]
    this.nextShape = this.shapeQueue[1]
    this.score = 0
    this.lines = 0
    this.level = -1

    this.lastUpdate = 0
    this.resetNext = false
    this.updateInterval = 750
    this.paused = false

    this.addEventListeners()
    this.updateNextShape()
    this.updateLines()
    this.updateLevel()

    this.update = this.update.bind(this)
    this.start = this.update
  }

  resetBoard() {
    const lines = this.board.clearFullRows()
    
    this.updateLines(lines)
    this.updateNextShape()
    this.resetNext = false
    this.draw()

    if (this.collides()) {
      alert('oh bugger!')
      this.board = new Board
      this.shapeQueue = [new Shape, new Shape]
      this.updateScore(-this.score)
      this.updateLines(-this.lines)
      this.updateLevel()
      this.updateInterval = 750
    }

    this.lastUpdate = 0
  }

  updateScore(score) {
    this.score += score
    this.scoreElement.innerText = this.score
  }

  updateLines(lines = 0) {
    this.lines += lines
    this.linesElement.innerText = this.lines

    this.updateLevel()

    let points = 0

    switch(lines) {
      case 1: points = 40; break
      case 2: points = 100; break
      case 3: points = 300; break
      case 4: points = 1200; break
    }
      
    this.updateScore(points * (this.level+1))
  }

  updateLevel() {
    const level = Math.floor(this.lines/10)

    if (level != this.level) { 
      this.level = level 
      this.levelElement.innerText = this.level
      this.updateInterval -= 30
    }
  }

  updateNextShape() {
    this.shapeQueue.shift()
    this.shapeQueue.push(new Shape)
    this.shape = this.shapeQueue[0]
    this.nextShape = this.shapeQueue[1]
    this.nextShapeElement.innerHTML = this.nextShape.render()
  }

  collides() {
    const board = this.board.copy()
    const shape = this.shape

    for (let row in shape.grid){
      for (let col in shape.grid[row]) {
        if (shape.grid[row][col] == 0) { continue }

        const [y,x] = [Number(row)+shape.pos.y, Number(col)+shape.pos.x]
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
    let points = 0
    do {
      this.shape.drop()
      points++
    } while (!this.collides())

    this.shape.unDrop()
    this.updateScore((points-1) * 20)
    this.lastUpdate = performance.now() - this.updateInterval
  }

  isUpdateDue() {
    const time = window.performance.now()
    requestAnimationFrame(this.update)

    if ((this.paused) || (time - this.lastUpdate < this.updateInterval)) {
      return false
    }

    this.lastUpdate = time
    return true
  }

  update() {
    if (!this.isUpdateDue()) { return }

    if (this.resetNext) {
      this.resetBoard()
      return
    }

    this.shape.drop()

    if (this.collides()) {
      this.shape.unDrop()
      this.board.grid = this.merged()
      this.resetNext = true
    }

    this.draw()
  }

  render(merged) {
    const boardHTML = ['<div class="board">']
    for (let row of merged) {
      if (this.resetNext && !row.includes('x')) {
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
          if (this.collides()) {this.shape.move(1)}
          this.draw()
          break
        case 'ArrowRight': 
          this.shape.move(1)
          if (this.collides()) {this.shape.move(-1)}
          this.draw()
          break
        case 'ArrowDown': 
          this.shape.drop()
          if (this.collides()) {this.shape.unDrop()}
          this.lastUpdate = performance.now()
          this.updateScore(10)
          this.draw()
          break
        case 'z': 
          this.shape.rotateCCW()
          if (this.collides()) {this.shape.rotateCW()}
          this.draw()
          break
        case 'x': 
          this.shape.rotateCW()
          if (this.collides()) {this.shape.rotateCCW()}
          this.draw()
          break
        case ' ': 
          this.plummet()
          this.draw()
          break
      }
    })
  }
}