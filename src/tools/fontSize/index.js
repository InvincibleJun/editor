import render from '../../utils/render'
import dropModal from '../../components/drop-modal'
import { addEvent } from '../../utils/dom-core'

const optionMap = [
  { value: 1, size: 14, inner: 'x-small' },
  { value: 2, size: 16, inner: 'small' },
  { value: 3, size: 18, inner: 'normal' },
  { value: 4, size: 20, inner: 'large' },
  { value: 5, size: 22, inner: 'x-large' },
  { value: 6, size: 24, inner: 'xx-large' }
]

const DropdownView = function() {
  let lis = optionMap.map(val =>
    render('font', val.inner, {
      value: val.value,
      style: `font-size: ${val.inner}`
    })
  )
  return render('ul', lis, {
    class: 'c-editor-font-size-wrapper'
  })
}

export default class FontSize {
  constructor(el, editor) {
    this.el = el
    this.editor = editor
    this._cmd = 'fontSize'
    // this._status = false
    this.init()
  }

  init() {
    var childs = DropdownView()
    dropModal(this.el, childs)

    addEvent(childs, 'click', e => {
      let target = e.target
      let value = target.getAttribute('value')
      this.editor.exec(this._cmd, +value)
    })
  }
}
