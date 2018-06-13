import Game from './src/Game';

const webtris = document.querySelector('.webtris')
const scoreBoard = document.querySelector('.score')
const lineCount = document.querySelector('.lines')
const level = document.querySelector('.level')
const nextShape = document.querySelector('.next-shape')

window.game = new Game(webtris, scoreBoard, lineCount, level, nextShape)
window.game.start()
