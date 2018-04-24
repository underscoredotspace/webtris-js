import Block from "./Block"

export default class Row {
  constructor() {
    this.blocks = new Array(10).fill(new Block())
  }

  render() {
    const blockHTML = this.blocks.map(block => block.render()).join('')
    return `<div class="row">\n\t${blockHTML}\n</div>`
  }
}