import { addEvent } from '../../utils/dom-core'

const allJustify = ['Center', 'Left', 'Right', 'Full']

export default class Justify {
  constructor(el, editor) {
    this.el = el
    this.id = editor.uuid
    this.editor = editor
    this._status = false
    this.init()
  }

  init() {
    this._resigter = addEvent(this.el, 'click', e => this.hanlderClick(e))
  }

  hanlderClick() {
    this.editor.exec(this._cmd)

    let status = this.editor.status(this._cmd)

    this.toggleActive(status)
  }

  /**
   * @params [boolean] status 是否激活
   * @params [boolean] from 是否外部调用
   */
  toggleActive(status, from) {
    if (status === this._status) return

    if (!from) {
      allJustify.forEach(value => {
        const Sub = this.editor._toolsCollect['justify' + value]
        if (Sub && Sub !== this) Sub.toggleActive(false, true)
      })
    }

    this.el.classList[status ? 'add' : 'remove']('c-edit-icon-active')

    this._status = status
  }
}

Justify.tmp = {}
