jest.mock('../src/shapes')
import Shape from '../src/Shape'
import Board from '../src/Board'

describe('Shape', () => {
  let shape
  let board
  
  beforeEach(() => {
    board = new Board(10,19)
    shape = board.shape
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
    const board = new Board(10, 19)
    const shape = board.shape
    shape.rotateCCW()
    shape.move(-4,3)

    // check we're on left edge
    expect(shape.position).toEqual({x:0,y:4})
    expect(shape.grid).toEqual(expected)

    // tests
    shape.rotateCCW()
    expect(shape.position).toEqual({x:0,y:4})
    expect(shape.grid).toEqual(expected)
    shape.rotateCW()
    expect(shape.position).toEqual({x:0,y:4})
    expect(shape.grid).toEqual(expected)
  })

  test('shape can\'t be rotated when on right', () => {
      // setup
      const expected = [[0, 1], [1, 1], [0, 1]]
      const board = new Board(10, 19)
      const shape = board.shape
      shape.rotateCW()
      shape.move(5,3)
  
      // check we're on left edge
      expect(shape.position).toEqual({x:8,y:4})
      expect(shape.grid).toEqual(expected)
      // tests
      shape.rotateCCW()
      expect(shape.position).toEqual({x:8,y:4})
      expect(shape.grid).toEqual(expected)
      shape.rotateCW()
      expect(shape.position).toEqual({x:8,y:4})
      expect(shape.grid).toEqual(expected)
  })

  test('shape can be rotated when on right - 1 (regression test)', () => {
    // setup
    const expected = [[0, 1], [1, 1], [0, 1]]
    const board = new Board(10, 19)
    const shape = board.shape
    shape.rotateCW()
    shape.move(4,3)

    // check we're on left edge
    expect(shape.position).toEqual({x:7,y:4})
    expect(shape.grid).toEqual(expected)
    // tests
    shape.rotateCCW()
    expect(shape.position).toEqual({x:7,y:5})
    expect(shape.grid).toEqual([[1, 1, 1], [0, 1, 0]])
    shape.rotateCW()
    expect(shape.position).toEqual({x:7,y:4})
    expect(shape.grid).toEqual(expected)
  })


  test("this.atBottom = true when shape touches bottom of board", () => {
    const board = new Board(10, 19)
    const shape = board.shape

    shape.move(0, 15)

    expect(shape.position).toEqual({x:3,y:17})
    expect(shape.atBottom).toBeTruthy()
  })

  test("shape can't rotate when center of piece is on bottom", () => {
    const board = new Board(10, 19)
    const shape = board.shape

    shape.rotateCCW()
    shape.rotateCCW()
    shape.move(0, 16)
    shape.rotateCW()

    expect(shape.position).toEqual({x:3,y:17})
  })

  // test("shape can't overlap another", () => {
  //   const board = new Board(10, 19)
  //   const shape = board.shape

  //   shape.move(0, 15)
  //   board.update()
  //   board.update()
  //   board.newShape()
  //   // shape.move(0, 13)
  //   // board.update()

  //   console.log(board.board)

  //   expect(shape.position).toEqual({x:3,y:15})
  // })
})