import Block from "./Block"

export default class Row {
  constructor() {
    this.blocks = []
    for (let ndx = 0; ndx<=9; ndx++) {
      this.blocks[ndx] = new Block()
    }
  }

  render() {
    const blockHTML = this.blocks.map(block => block.render()).join('')
    return `<div class="row">\n\t\t${blockHTML}\n</div>`
  }
}