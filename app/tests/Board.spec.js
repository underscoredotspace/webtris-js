import Board from '../src/Board'
import Block from '../src/Block'
import Row from '../src/Row'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

describe('Board', () => {
  let board

  beforeEach(() => {
    board = new Board()
  })

  test('has 18 rows with 10 columns filled with 0', () => {
    expect.assertions(2)
    expect(board.board).toBeInstanceOf(Array)
    expect(board.board).toHaveLength(180)
  })

  test('render method', () => {
    expect.assertions(1)
    const blockHTML = new Array(10).fill('<div class="block" type="x"></div>').join('') // cheat
    const rowHTML = `<div class="row">${blockHTML}</div>`
    const cleanRows = new Array(18).fill(rowHTML).join('').replace(/[\n\t]/g, '')
    const boardHTML = `<div class="board">${cleanRows}</div>`

    expect(board.render().replace(/[\n\t]/g, '')).toBe(boardHTML)
  })
})