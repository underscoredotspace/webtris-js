jest.mock('../src/shapes')
import Shape from '../src/Shape'

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
})