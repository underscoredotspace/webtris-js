jest.mock('../src/shapes')
import Shape from '../src/Shape'
import Board from '../src/Board'

describe('Shape', () => {
  let shape
  
  beforeEach(() => {
    shape = new Shape({w:10, h:19})
  })

  test('move method - positive move', () => {
    const startX = shape.position.x
    const startY = shape.position.y
    shape.move(1,1)
    expect(shape.position.x).toBe(startX+1)
    expect(shape.position.y).toBe(startY+1)
  })

  test('move method - negative move', () => {
    const startX = shape.position.x
    const startY = shape.position.y
    shape.move(-1,-1)
    expect(shape.position.x).toBe(startX-1)
    expect(shape.position.y).toBe(startY)
  })

  test('rotate CCW', () => {
    const expected = [[1, 0], [1, 1], [1, 0]]
    shape.rotateCCW()
    expect(shape.grid).toEqual(expected)
  })

  test('rotate CW', () => {
    const expected = [[0, 1], [1, 1], [0, 1]]
    shape.rotateCW()
    expect(shape.grid).toEqual(expected)
  })

  test('you can\'t rotate square', () => {
    const expected = [[1, 1, 1], [0, 1, 0]]
    shape.type = 'o'  // trickery

    shape.rotateCCW()
    expect(shape.grid).toEqual(expected)

    shape.rotateCW()
    expect(shape.grid).toEqual(expected)
  })

  test('shape can\'t be rotated when on left', () => {
    const expected = [[1, 0], [1, 1], [1, 0]]
    // setup
    const board = new Board()
    board.newShape()
    const shape = board.shape
    shape.rotateCCW()
    shape.move(-4,3)

    // check we're on left edge
    expect(shape.position).toEqual({x:0,y:2})
    expect(shape.grid).toEqual(expected)

    // tests
    shape.rotateCCW()
    expect(shape.position).toEqual({x:0,y:2})
    expect(shape.grid).toEqual(expected)
    shape.rotateCW()
    expect(shape.position).toEqual({x:0,y:2})
    expect(shape.grid).toEqual(expected)
  })

  test('shape can\'t be rotated when on right', () => {
      // setup
      const expected = [[0, 1], [1, 1], [0, 1]]
      const board = new Board()
      board.newShape()
      const shape = board.shape
      shape.rotateCW()
      shape.move(5,3)
  
      // check we're on left edge
      expect(shape.position).toEqual({x:8,y:2})
      expect(shape.grid).toEqual(expected)
      // tests
      shape.rotateCCW()
      expect(shape.position).toEqual({x:8,y:2})
      expect(shape.grid).toEqual(expected)
      shape.rotateCW()
      expect(shape.position).toEqual({x:8,y:2})
      expect(shape.grid).toEqual(expected)
  })

  test('shape can be rotated when on right - 1 (regression test)', () => {
    // setup
    const expected = [[0, 1], [1, 1], [0, 1]]
    const board = new Board()
    board.newShape()
    const shape = board.shape
    shape.rotateCW()
    shape.move(4,3)

    // check we're on left edge
    expect(shape.position).toEqual({x:7,y:2})
    expect(shape.grid).toEqual(expected)
    // tests
    shape.rotateCCW()
    expect(shape.position).toEqual({x:7,y:3})
    expect(shape.grid).toEqual([[1, 1, 1], [0, 1, 0]])
    shape.rotateCW()
    expect(shape.position).toEqual({x:7,y:2})
    expect(shape.grid).toEqual(expected)
})
})