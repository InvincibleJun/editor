import Justify from './index'

export default class justifyRight extends Justify {
  constructor(el, editor) {
    super(el, editor)
    this._cmd = 'justifyRight'
  }
}
