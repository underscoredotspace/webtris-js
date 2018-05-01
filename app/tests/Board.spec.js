import Board from '../src/Board'
import Shape from '../src/Shape'
import shapes from '../src/shapes'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

describe('Board', () => {
  let board

  beforeEach(() => {
    board = new Board()
  })

  test('has 18 rows with 10 columns filled with 0', () => {
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
    expect(board.render()).toMatchSnapshot()
  })
})