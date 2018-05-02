import Board from '../src/Board'
jest.mock('../src/shapes')
import Shape from '../src/Shape'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

describe('Board', () => {
  let board

  beforeEach(() => {
    board = new Board()
  })

  test('has 19 rows with 10 columns filled with 0', () => {
    expect.assertions(2)
    expect(board.board).toBeInstanceOf(Array)
    expect(board.board).toHaveLength(190)
  })

  test('render method', () => {
    expect.assertions(1)
    expect(board.render()).toMatchSnapshot()
  })

  test('newShape method should add new Shape to this.shape', () => {
    board.newShape()
    expect(board.shape).toBeInstanceOf(Shape)
  })

  test('row method returns row', () => {
    const expected = new Array(10).fill('x')
    expect(board.row(0)).toEqual(expected)
  })

  test('render method with board.shape', () => {
    board.newShape()
    expect(board.render()).toMatchSnapshot()
  })

  test('update method where shape is not at bottom', () => {
    board.newShape()
    board.update()
    expect(board.render()).toMatchSnapshot()
  })
})