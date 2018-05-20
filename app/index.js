import Board from '../app/src/Board'

let board = new Board()
const webtris = document.querySelector('.webtris')

function update() {
  if ((performance.now() > updateTime + 300) && !window.webtrisPaused) {
    webtris.innerHTML = board.render()
    board.update()
    updateTime = performance.now()
  }
  requestAnimationFrame(update)
}

let updateTime = performance.now()
update()

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
        board = new Board()
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
    case 'z':
      board.shape.rotateCCW()
      webtris.innerHTML = board.render()
      break
    case 'x':
      board.shape.rotateCW()
      webtris.innerHTML = board.render()
      break
          
    default:
      break
  }
})