import Board from '../src/Board'
import Block from '../src/Block'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

describe('Board', () => {
  let webtris

  beforeEach(() => {
    webtris = new Board()
  })

  test('has 18 rows with 10 columns filled with 0', () => {
    expect.assertions(4)
    expect(webtris.rows).toBeInstanceOf(Array)
    expect(webtris.rows).toHaveLength(18)
    expect(webtris.rows[random(0,17)]).toBeInstanceOf(Array)
    expect(webtris.rows[random(0,17)][random(0,9)]).toBeInstanceOf(Block)
  })
})