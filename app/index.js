import Board from '../app/src/Board'
import Game from './src/Game';

const webtris = document.querySelector('.webtris')
const scoreBoard = document.querySelector('.score')
new Game(webtris, scoreBoard).start()
