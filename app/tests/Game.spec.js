jest.mock('../src/shapes')
import Game from '../src/Game'
import Board from '../src/Board';
import Shape from '../src/Shape';

describe("Game() unit tests", () => {
  let game, boardElement, scoreElement, linesElement, levelElement, nextShapeElement

  beforeEach(() => {
    jest.resetAllMocks()

    boardElement = document.createElement('div')
    scoreElement = document.createElement('div')
    linesElement = document.createElement('div')
    levelElement = document.createElement('div')
    nextShapeElement = document.createElement('div')

    game = new Game(boardElement, scoreElement, linesElement, levelElement, nextShapeElement)
  })

  test("Starting point",  () => {
    expect(game.board).toBeInstanceOf(Board)
    expect(game.shape).toBeInstanceOf(Shape)
    expect(game.nextShape).toBeInstanceOf(Shape)
    expect(game.score).toBe(0)
    expect(game.lines).toBe(0)
    expect(nextShapeElement.innerHTML).toMatchSnapshot()
  })

  test("merged()", () => {
    const mergedBoard = game.merged()
    expect(mergedBoard).toMatchSnapshot()
  })

  test("render() with no full rows", () => {
    expect(game.render(game.merged())).toMatchSnapshot()
  })

  test("render() with a full row but resetNext != true", () => {
    game.board.grid[18] = new Array(10).fill('t')
    expect(game.render(game.merged())).toMatchSnapshot()
  })

  test("render() with a full row and resetNext is true", () => {
    game.board.grid[18] = new Array(10).fill('t')
    game.resetNext = true
    expect(game.render(game.merged())).toMatchSnapshot()
  })

  test("collides() does not", () => {
    expect(game.collides()).toBeFalsy()
  })

  test("collides() with edge left", () => {
    game.shape.pos.x = 0
    expect(game.collides()).toBeFalsy()
    game.shape.pos.x = -1
    expect(game.collides()).toBeTruthy()
  })

  test("collides() with edge right", () => {
    game.shape.pos.x = 7
    expect(game.collides()).toBeFalsy()
    game.shape.pos.x = 8
    expect(game.collides()).toBeTruthy()
  })

  test("collides() with edge bottom", () => {
    game.shape.pos.y = 17
    expect(game.collides()).toBeFalsy()
    game.shape.pos.y = 18
    expect(game.collides()).toBeTruthy()
  })

  test("collides() with shape", () => {
    game.board.grid[2] = new Array(10).fill('t')
    expect(game.collides()).toBeTruthy()
  })

  test("plummet()", () => {
    game.plummet()
    expect(game.shape.pos).toEqual({x:3, y:17})
  })

  test("draw()", () => {
    game.draw()
    expect(game.boardElement.innerHTML).toMatchSnapshot()
  })

  test('resetBoard() where new shape does not collide with existing', () => {
    game.plummet()
    game.update()
    game.resetBoard()
    
    expect(game.render(game.merged())).toMatchSnapshot()
  })

  test("resetBoard() where new shape collides with existing", () => {
    window.alert = jest.fn()
    game.collides = jest.fn().mockReturnValueOnce(true)

    game.resetBoard()
    
    expect(window.alert).toBeCalledWith('oh bugger!')
    expect(game.board.grid).toEqual(new Array(19).fill(new Array(10).fill('x')))

    expect(game.score).toBe(0)
    expect(game.lines).toBe(0)
    expect(game.level).toBe(0)
    expect(game.lastUpdate).toBe(0)
  })
})

// describe('Game() integration tests', () => {
  
// });