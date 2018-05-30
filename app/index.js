import Game from './src/Game';

const webtris = document.querySelector('.webtris')
const scoreBoard = document.querySelector('.score')
const nextShape = document.querySelector('.next-shape')

new Game(webtris, scoreBoard, nextShape).start()
