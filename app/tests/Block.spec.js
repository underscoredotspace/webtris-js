import Block from '../src/Block'

describe('Block', () => {
  let block
  beforeEach(() => {
    block = new Block()
  })

  test('initial props', () => {
    expect.assertions(2)
    expect(block).toHaveProperty('type')
    expect(block.type).toBe('x')
  })

  test('render method', () => {
    expect.assertions(1)
    expect(block.render()).toBe(`<div class="block" type="x"></div>`)
  })
})