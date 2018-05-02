import shapes from '../src/shapes'

describe('Shapes list array', () => {
  test('Check props', () => {
    expect.assertions(123)
    expect(shapes.length).toBe(7)

    for (let shape of shapes) {
      expect(shape.type).toHaveLength(1)
      expect(shape).toHaveProperty('start')
      expect(shape.start).toBeGreaterThanOrEqual(0)
      expect(shape.start).toBeLessThanOrEqual(9)
      expect(shape.grid).toBeInstanceOf(Array)
      expect(shape.rotateFix).toBeInstanceOf(Array)

      for (let rotateFix of shape.rotateFix) {
        expect(rotateFix.x).toBeGreaterThanOrEqual(-2)
        expect(rotateFix.x).toBeLessThanOrEqual(2)
        expect(rotateFix.y).toBeGreaterThanOrEqual(-2)
        expect(rotateFix.y).toBeLessThanOrEqual(2)
      }
    }
  })
})