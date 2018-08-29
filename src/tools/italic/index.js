import { addEvent } from '../../utils/dom-core'

export default class Italic {
  constructor(el, editor) {
    this.el = el
    this.editor = editor
    this._cmd = 'italic'
    this._status = false
    this.init()
  }

  init() {
    this._resigter = addEvent(this.el, 'click', e => this.hanlderClick(e))
  }

  hanlderClick() {
    let isEmpty = this.editor.selection.isEmpty()

    if (isEmpty) {
      this.editor.selection.createEmpty()
    }

    this.editor.exec(this._cmd)

    if (isEmpty) {
      // 需要将选取折叠起来
      this.editor.selection.collapseRange()
      this.editor.selection.restoreSelection()
    }

    this._status = this.editor.status(this._cmd)
    this.toggleActive(this._status)
  }

  toggleActive(status) {
    this.el.classList[status ? 'add' : 'remove']('c-edit-icon-active')
  }

  destory() {
    this._resigter()
  }
}
