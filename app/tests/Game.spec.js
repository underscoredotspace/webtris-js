jest.mock('../src/shapes')
import Game from '../src/Game'
import Board from '../src/Board';
import Shape from '../src/Shape';

describe("Game() unit tests", () => {
  let game, boardElement, scoreElement, linesElement, levelElement, nextShapeElement

  beforeEach(() => {
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
    expect(game.level).toBe(0)
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
    game.draw()

    expect(game.boardElement.innerHTML).toMatchSnapshot()
  })

  test("resetBoard() where new shape collides with existing", () => {
    window.alert = jest.fn()
    game.collides = jest.fn().mockReturnValue(true)
    game.isUpdateDue = jest.fn().mockReturnValue(true)

    game.resetBoard()
    
    expect(window.alert).toBeCalledWith('oh bugger!')
    expect(game.board.grid).toEqual(new Array(19).fill(new Array(10).fill('x')))

    expect(game.score).toBe(0)
    expect(game.lines).toBe(0)
    expect(game.level).toBe(0)
    expect(game.lastUpdate).toBe(0)
  })

  describe('updateLines()', () => {
    test('1 line', () => {
      game.updateLines(1)
      expect(game.lines).toBe(1)
      expect(game.score).toBe(40)
      expect(game.level).toBe(0)
    })

    test('2 lines', () => {
      game.updateLines(2)
      expect(game.lines).toBe(2)
      expect(game.score).toBe(100)
      expect(game.level).toBe(0)
    })

    test('3 lines', () => {
      game.updateLines(3)
      expect(game.lines).toBe(3)
      expect(game.score).toBe(300)
      expect(game.level).toBe(0)
    })

    test('4 lines', () => {
      game.updateLines(4)
      expect(game.lines).toBe(4)
      expect(game.score).toBe(1200)
      expect(game.level).toBe(0)
    })

  })

  describe('isUpdateDue()', () => {
    window.performance.now = jest.fn().mockReturnValue(200)
    window.requestAnimationFrame = jest.fn()

    test('game paused, update time not passed', () => {
      game.paused = true
      expect(game.isUpdateDue()).toBeFalsy()
    })

    test('game paused, update time passed', () => {
      game.paused = true
      window.performance.now.mockReturnValueOnce(1000)
      expect(game.isUpdateDue()).toBeFalsy()
    })

    test('game not paused, update time not passed', () => {
      game.paused = false
      expect(game.isUpdateDue()).toBeFalsy()
    })

    test('game not pased, update time passed', () => {
      game.paused = false
      window.performance.now.mockReturnValueOnce(1000)
      expect(game.isUpdateDue()).toBeTruthy()
    })
  })

  describe('update', () => {
    beforeEach(() => {
      game.isUpdateDue = jest.fn().mockReturnValue(true)
      game.draw = jest.fn()
    })

    test('update due', () => {
      game.update()
      expect(game.shape.pos).toEqual({x:3, y:3})
      expect(game.draw).toHaveBeenCalledTimes(1)
    })

    test('update not due', () => {
      game.isUpdateDue.mockReturnValueOnce(false)
      game.update()
      expect(game.shape.pos).toEqual({x:3, y:2})
      expect(game.draw).not.toHaveBeenCalled()
    })

    test('update due and resetNext', () => {
      game.update()
      game.update()
      expect(game.shape.pos).toEqual({x:3, y:4})
      game.resetNext = true
      game.update()
      expect(game.shape.pos).toEqual({x:3, y:2})
      expect(game.draw).toHaveBeenCalledTimes(3)
    })
  })
})