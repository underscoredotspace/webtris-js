import Block from '../src/Block'

export default class Board {
  constructor() {
    this.rows = new Array(18).fill(new Array(10).fill(new Block))
  }
}