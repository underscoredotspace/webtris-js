import Board from '../src/Board'
import Shape, { shapes } from '../src/Shape'

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

  test('newShape method should add new Shape to this.shape', () => {
    board.newShape()
    expect(board.shape).toBeInstanceOf(Shape)
  })

  test('row method returns row', () => {
    const row = new Array(10).fill('x')
    expect(board.row(0)).toEqual(row)
  })

  test('render method with board.shape', () => {
    const testShape = shapes[0]
    const shape = new Shape()
    shape.grid = testShape.grid
    shape.type = testShape.type
    shape.position = {x: testShape.start, y: 0}

    board.shape = shape
    const expected = '<div class=\"board\"><div class=\"row\"><div class=\"block\" type=\"x\"></div><div class=\"block\" type=\"x\"></div><div class=\"block\" type=\"x\"></div><div class=\"block\" type=\"l\"></div><div class=\"block\" type=\"l\"></div><div class=\"block\" type=\"l\"></div><div class=\"block\" type=\"x\"></div><div class=\"block\" type=\"x\"></div><div class=\"block\" type=\"x\"></div><div class=\"block\" type=\"x\"></div></div>'
    expect(board.render().replace(/[\t\n]/g, '').substring(0,expected.length)).toBe(expected)
  })
})