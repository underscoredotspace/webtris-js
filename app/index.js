import Board from '../app/src/Board'

const board = new Board()
const webtris = document.querySelector('.webtris')

let updateTime = performance.now()

function update() {
  webtris.innerHTML = board.render()
  if (performance.now() > updateTime + 1000) {
    updateTime = performance.now()
    // board.drop()
  }
  requestAnimationFrame(update)
}

update()