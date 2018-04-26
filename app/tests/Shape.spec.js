import Shape, {shapes} from '../src/Shape'

describe('Shape', () => {
  let shape
  
  beforeEach(() => {
    shape = new Shape()
  })

  test('initial setup', () => {
    expect(shape.type).toHaveLength(1)
    expect(shape.position.y).toBe(0)
    expect(shape.position.x).toBeGreaterThanOrEqual(0)
    expect(shape.position.x).toBeLessThanOrEqual(9)
    expect(shape.grid).toBeInstanceOf(Array)
  })
})