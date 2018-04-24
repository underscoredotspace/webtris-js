const template = `<div class="block" type="{{type}}"></div>`

export default class Block {
  constructor() {
    this.type = 'x'
  }

  render() {
    return template.replace('{{type}}', this.type)
  }
}