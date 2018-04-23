import Board from '../src/Board'

describe('Board', () => {
  let webtris

  beforeEach(() => {
    webtris = new Board()
  })

  test('has 18 rows', () => {
    expect(webtris.rows).toBeInstanceOf(Array)
    expect(webtris.rows).toHaveLength(18)
    console.log(webtris.rows)
  })

})