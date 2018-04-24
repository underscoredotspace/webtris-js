import Board from '../app/src/Board'

const board = new Board()
const webtris = document.querySelector('.webtris')

webtris.innerHTML = board.render()