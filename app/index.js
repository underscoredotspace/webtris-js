import Board from '../app/src/Board'

const board = new Board()
const webtris = document.querySelector('.webtris')

function update() {
  if (performance.now() > updateTime + 1000) {
    webtris.innerHTML = board.render()
    board.shape.move(0,1)
    updateTime = performance.now()
  }
  requestAnimationFrame(update)
}

board.newShape()
webtris.innerHTML = board.render()
let updateTime = performance.now()-1000
update()