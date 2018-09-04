import Justify from './index'

export default class JustifyLeft extends Justify {
  constructor(el, editor) {
    super(el, editor)
    this._cmd = 'justifyLeft'
    setTimeout(() => {
      this.toggleActive(true)
    }, 0)
  }
}
