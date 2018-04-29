import Board from '../app/src/Board'

const board = new Board()
const webtris = document.querySelector('.webtris')

function update() {
  if ((performance.now() > updateTime + 500) && !window.webtrisPaused) {
    board.update()
    webtris.innerHTML = board.render()
    updateTime = performance.now()
  }
  requestAnimationFrame(update)
}

board.newShape()
webtris.innerHTML = board.render()
let updateTime = performance.now()-500
update()

window.addEventListener('keydown', keypressed => {
  const key = keypressed.key

  if (key == 'p') {
    if (window.webtrisPaused === true) {
      window.webtrisPaused = false
    } else {
      window.webtrisPaused = true
    }
  }

  if (window.webtrisPaused) {
    return
  }

  switch (key) {
    case 'ArrowLeft':
      board.shape.move(-1,0)
      webtris.innerHTML = board.render()
      break;
    case 'ArrowRight':
      board.shape.move(1,0)
      webtris.innerHTML = board.render()
      break;
    case 'z':
      board.shape.rotateCCW()
      webtris.innerHTML = board.render()
      break;
    case 'x':
      board.shape.rotateCW()
      webtris.innerHTML = board.render()
      break;
          
    default:
      break;
  }
})