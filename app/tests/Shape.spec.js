jest.mock('../src/shapes')
import Shape from "../src/Shape"

describe("Shape()", () => {
  let shape

  beforeEach(() => {
    shape = new Shape();
  })

  test("Starting point", () => {
    expect(shape.pos).toEqual({x:3,y:2})
    expect(shape.type).toEqual('t')
  })

  test("move(1)", () => {
    shape.move(1)
    expect(shape.pos).toEqual({x:4,y:2})
  })

  test("move(-1)",  () => {
    shape.move(-1)
    expect(shape.pos).toEqual({x:2,y:2})
  })

  test("drop()", () => {
    shape.drop()
    expect(shape.pos).toEqual({x:3,y:3})
  })

  test("rotateCW()", () => {
    shape.rotateCW()
    expect(shape.grid).toEqual([[0, 1], [1, 1], [0, 1]])
    expect(shape.pos).toEqual({x:3,y:1})
  })

  test("rotateCW() all the way round", () => {
    shape.rotateCW()
    shape.rotateCW()
    shape.rotateCW()
    shape.rotateCW()
    expect(shape.grid).toEqual([[1,1,1],[0,1,0]])
  })

  test("rotateCCW()", () => {
    shape.rotateCCW()
    expect(shape.grid).toEqual([[1, 0], [1, 1],[1, 0]])
    expect(shape.pos).toEqual({x:4,y:1})
  })

  test("rotateCCW() all the way round", () => {
    shape.rotateCCW()
    shape.rotateCCW()
    shape.rotateCCW()
    shape.rotateCCW()
    expect(shape.grid).toEqual([[1,1,1],[0,1,0]])
  })
})