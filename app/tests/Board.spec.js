jest.mock('../src/shapes')

import Board from '../src/Board'
import Shape from '../src/Shape'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

describe('Board', () => {
  let board

  beforeEach(() => {
    board = new Board(10, 19)
  })

  test('has 19 rows with 10 columns filled with 0', () => {
    expect.assertions(2)
    expect(board.board).toHaveLength(19)
    expect(board.board).toBeInstanceOf(Array)
  })

  test('render method', () => {
    expect.assertions(1)
    expect(board.render()).toMatchSnapshot()
  })

  test('newShape method should add new Shape to this.shape', () => {
    expect(board.shape).toBeInstanceOf(Shape)
  })

  test('render method with board.shape', () => {
    expect(board.render()).toMatchSnapshot()
  })

  test('update method where shape is not at bottom', () => {
    board.update()
    expect(board.render()).toMatchSnapshot()
  })

  test('update method where shape gets at the bottom', () => {
    board.shape.move(0,15)
    board.update()
    expect(board.render()).toMatchSnapshot()
  })

  test('update method where shape is already at the bottom', () => {
    board.shape.move(0,15)
    board.update()
    board.update()

    expect(board.shape.atBottom).toBeFalsy()
  })

  test("Line is marked as full then removed when it's full", () => {
    board.board[18] = new Array(10).fill('t')
    board.shape.atBottom = true
    expect(board.render()).toMatchSnapshot()
    board.update()
    board.update()
    expect(board.render()).toMatchSnapshot()
  })
})