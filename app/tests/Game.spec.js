import Game from '../src/Game'
import Board from '../src/Board';
import Shape from '../src/Shape';

describe("Game()", () => {
  let game

  beforeEach(() => {
    game = new Game()
  })

  test("Starting point",  () => {
    expect(game.board).toBeInstanceOf(Board)
    expect(game.shape).toBeInstanceOf(Shape)
    expect(game.nextShape).toBeInstanceOf(Shape)
    expect(game.score).toBe(0)
    expect(game.lines).toBe(0)
  })

  test("merged()", () => {
    const mergedBoard = game.merged()
    expect(mergedBoard).toMatchSnapshot()
  })

  test("render() with no full rows", () => {
    expect(game.render()).toMatchSnapshot()
  })

  test("render() with a full row", () => {
    game.board.grid[18] = new Array(10).fill('t')
    game.atBottom = true
    expect(game.render()).toMatchSnapshot()
  })
})