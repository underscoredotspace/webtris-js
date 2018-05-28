import Board from '../app/src/Board'

let board = new Board(10, 19)
const webtris = document.querySelector('.webtris')
const scoreBoard = document.querySelector('.score')
let lines = 0

function update() {
  // debugger
  let removedLines

  if ((performance.now() > updateTime + 300) && !window.webtrisPaused) {
    webtris.innerHTML = board.render()
    if (board.shape.gameover) {
      alert("Oh Bugger!")
      board = new Board(10, 19)
    } else {
      removedLines = board.update()
    }
    updateTime = performance.now()
  }

  if (removedLines > 0) {
    updateScore(removedLines)
  }
  requestAnimationFrame(update)
}

let updateTime = performance.now()
update()

function updateScore(removedLines) {
  lines += removedLines
  scoreBoard.innerText = lines
}

window.addEventListener('keydown', keypressed => {
  const key = keypressed.key

  if (key == 'p' || key == 'd') {
    window.webtrisPaused = (window.webtrisPaused===true ? false : true)
  }

  if (window.webtrisDebug) {
    switch (key) {
      case 'ArrowLeft':
        board.shape.move(-1, 0)
        webtris.innerHTML = board.render()
        break
      case 'ArrowRight':
        board.shape.move(1,0)
        webtris.innerHTML = board.render()
        break
      case 'ArrowUp':
        board.shape.position.y -= 1
        webtris.innerHTML = board.render()
        break
      case 'ArrowDown':
        board.shape.move(0,1)
        webtris.innerHTML = board.render()
        break
      case 'r':
        board = new Board(10, 19)
        webtris.innerHTML = board.render()
        window.board = board
        break
      case 'z':
        board.shape.rotateCCW()
        webtris.innerHTML = board.render()
        break
      case 'x':
        board.shape.rotateCW()
        webtris.innerHTML = board.render()
        break
      case 'u':
        board.update()
        webtris.innerHTML = board.render()
        break
            
      default:
        break
    }
  }

  if (window.webtrisPaused) { 
    if (key == 'd') {
      window.webtrisDebug = true
      window.board = board
      window.qm = function(x, y) {
        board.shape.move(x,y)
        webtris.innerHTML = board.render()
      }
    }
    return 
  }

  switch (key) {
    case 'ArrowLeft':
      board.shape.move(-1,0)
      webtris.innerHTML = board.render()
      break
    case 'ArrowRight':
      board.shape.move(1,0)
      webtris.innerHTML = board.render()
      break
    case 'ArrowDown':
      board.shape.move(0,1)
      updateTime = performance.now()
      webtris.innerHTML = board.render()
      break
    case 'z':
      board.shape.rotateCCW()
      webtris.innerHTML = board.render()
      break
    case 'x':
      board.shape.rotateCW()
      webtris.innerHTML = board.render()
      break
    case ' ':
      board.shape.plummet()
      webtris.innerHTML = board.render()
    default:
      console.log(key)
      break
  }
})