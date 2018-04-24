import Row from '../src/Row'
import Block from '../src/Block'

describe('Row', () => {
  let row
  beforeEach(() => {
    row = new Row()
  })

  test('initial props', () => {
    expect.assertions(2)
    expect(row).toHaveProperty('blocks')
    expect(row.blocks[0]).toBeInstanceOf(Block)
  })

  test('draw method', () => {
    expect.assertions(1)
    const blockHTML = `<div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div><div class="block" type="x"></div>`
    expect(row.render()).toBe(`<div class="row">\n\t${blockHTML}\n</div>`)
  })
})