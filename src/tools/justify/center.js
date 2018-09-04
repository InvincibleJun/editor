import Justify from './index'

export default class JustifyCenter extends Justify {
  constructor(el, editor) {
    super(el, editor)
    this._cmd = 'justifyCenter'
  }
}
