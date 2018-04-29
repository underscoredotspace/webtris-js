import Shape, {shapes} from '../src/Shape'

describe('Shape', () => {
  let shape
  
  beforeEach(() => {
    shape = new Shape({w:10, h:18})
  })

  test('initial setup', () => {
    expect(shape.type).toHaveLength(1)
    expect(shape.position.y).toBe(0)
    expect(shape.position.x).toBeGreaterThanOrEqual(0)
    expect(shape.position.x).toBeLessThanOrEqual(9)
    expect(shape.grid).toBeInstanceOf(Array)
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
    const testShape = shapes[0]
    shape.grid = testShape.grid
    shape.type = testShape.type
    shape.position = {x: testShape.start, y: 0}

    const expected = [[1,0],[1,0],[1,1]]
    shape.rotateCCW()
    expect(shape.grid).toEqual(expected)
  })

  test('rotate CW', () => {
    const testShape = shapes[0]
    shape.grid = testShape.grid
    shape.type = testShape.type
    shape.position = {x: testShape.start, y: 0}

    const expected = [[1, 1], [0, 1], [0, 1]]
    shape.rotateCW()
    expect(shape.grid).toEqual(expected)
  })
})