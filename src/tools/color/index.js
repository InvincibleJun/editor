import { addEvent } from '../../utils/dom-core'
import r from '../../utils/render'
import dropModal from '../../components/drop-modal'
import createSlide from '../../components/slide'

export default class Bold {
  constructor(el, editor) {
    this.el = el
    this.editor = editor
    this._cmd = 'bold'
    // this._status = false
    this.init()
  }

  init() {
    let modal = dropModal(this.el, this.view)
  }

  get view() {
    const slide = createSlide({ width: 200 })

    const colorMap = r(
      'div',
      [
        r('div', [], {
          class: 'c-colorpicker-white'
        }),
        r('div', [], {
          class: 'c-colorpicker-black'
        })
      ],
      {
        class: 'c-colorpicker-wrapper',
        style: {
          backgroundColor: 'green'
        }
      }
    )
    return r('div', [
      colorMap,
      slide
      // r('div', [], { style: 'width: 200px;height: 200px;background: #ccc' })
    ])
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
//   <div class="c-colorpicker-wrapper" ref="wrapper" :style="{backgroundColor: hueColor }">
//     <div class="c-colorpicker-white"></div>
//     <div class="c-colorpicker-black"></div>
