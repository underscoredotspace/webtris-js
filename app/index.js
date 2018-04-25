import Board from '../app/src/Board'

const board = new Board()
const webtris = document.querySelector('.webtris')

function update() {
  if (performance.now() > updateTime + 1000) {
    board.shape.move(0,1)
    webtris.innerHTML = board.render()
    updateTime = performance.now()
  }
  requestAnimationFrame(update)
}

board.newShape()
webtris.innerHTML = board.render()
let updateTime = performance.now()-1000
update()

window.addEventListener('keydown', key => {
  if (key.key == 'ArrowLeft') {
    board.shape.move(-1,0)
    webtris.innerHTML = board.render()
  } else if (key.key == 'ArrowRight') {
    board.shape.move(1,0)
    webtris.innerHTML = board.render()
  } else if (key.key == 'z') {
    board.shape.rotateCCW()
    webtris.innerHTML = board.render()
  } else if (key.key == 'x') {
    board.shape.rotateCW()
    webtris.innerHTML = board.render()
  }
})