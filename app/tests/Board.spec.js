import Board from "../src/Board"

describe("Board()", () => {
  let board
  let emptyGrid

  beforeEach(() => {
    const [h,w] = [19,10]
    board = new Board(w,h)
    emptyGrid = new Array(h).fill(new Array(w).fill('x'))
  })

  test("Starting point",  () => {
    expect(board.grid).toHaveLength(19)
    expect(board.grid).toEqual(emptyGrid)
    expect(board.size).toEqual({w:10,h:19})
  })

  test("copy()", () => {
    expect(board.copy()).not.toBe(board.grid)
    expect(board.copy()).toEqual(board.grid)
  })

  test("clearFullRows() with 0 full rows", () => {
    const lines = board.clearFullRows()
    expect(board.grid).toEqual(emptyGrid)
    expect(lines).toBe(0)
  })

  test("clearFullRows() with 1 full row", () => {
    board.grid[18] = new Array(10).fill('t')
    const lines = board.clearFullRows()
    expect(board.grid).toEqual(emptyGrid)
    expect(lines).toBe(1)
  })
})