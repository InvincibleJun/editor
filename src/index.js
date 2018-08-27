import { findEl, setAttr, addEvent, focusEle } from './utils/dom-core'
import config from './config/tools'
import colorSelector from './components/color-selector'
import fontSizeSelector from './components/fontSize-selector'
// import createModal from './components/modal'

import Media from './components/media/index'
// import Video from './components/video/index'
import Paste from './events/paste'

class Editor {
  constructor(selector, options) {
    this.selector = selector
    this.options = options
    this.init()
    this._range = null
    this.toolsInit()
  }

  init() {
    // 选区对象
    this.selection = window.getSelection()
    // 焦点位置
    this._range = null

    this.container = findEl(this.selector)

    this.editor = document.createElement('div')
    this.editor.classList.add('c-editor-content')

    this.editorWrapper = document.createElement('div')
    this.editorWrapper.classList.add('c-editor-content-wrapper')
    this.editorWrapper.appendChild(this.editor)
    this.container.appendChild(this.editorWrapper)

    addEvent(this.editor, 'blur', () => this.blur())
    addEvent(this.editor, 'focus', () => this.focus())
    addEvent(this.editor, 'keydown', e => this.keydown(e))
    // addEvent(this.editor, 'paste', e => this.paste(e))

    new Paste(this)

    setAttr(this.editor, 'contenteditable', true)

    this.create()
  }

  keydown(e) {
    if (e.keyCode === 8) {
      // 保持第一行空白
      if (this.editor.innerHTML === '<p><br></p>') {
        e.preventDefault()
      }
    } else if (e.keyCode === 13) {
    }
  }

  create() {
    this.editor.innerHTML = '<p><br /></p>'
    let last = this.editor.childNodes[0]
    let _range = document.createRange()
    _range.selectNodeContents(last)
    _range.collapse(false)

    this.saveRange(_range)

    this.restoreSelection()
  }

  find(selector, parent) {
    return findEl(selector, this.editor)
  }

  toolsInit() {
    var toolbar = document.createElement('div')

    toolbar.classList.add('c-editor-toolbar-wrapper')

    config.forEach((val, key) => {
      const { icon, cmd, params, name } = val
      let i = this.createIcon(icon, cmd, params, name)
      toolbar.appendChild(i)
    })
    this.container.insertBefore(toolbar, this.editorWrapper)
  }

  focus(e) {}

  // 保存光标位置
  saveRange(_range) {
    if (_range) {
      this._range = _range
      return
    }

    this._range = this.selection.rangeCount
      ? this.selection.getRangeAt(0)
      : null
  }

  // 选区是否为空
  isSelectionEmpty() {
    const range = this._range
    if (range && range.startContainer) {
      if (range.startContainer === range.endContainer) {
        if (range.startOffset === range.endOffset) {
          return true
        }
      }
    }
    return false
  }

  // 恢复选区
  restoreSelection() {
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(this._range)
  }

  blur(e) {
    // this.saveRange()
    // 失焦时保存当前range对象
  }

  createIcon(icon, cmd, params, name) {
    let i = document.createElement('i')
    let exec = this.exec.bind(this)

    i.classList.add('iconfont')
    i.classList.add(icon)

    if (name === 'image' || name === 'video') {
      new Media(i, this, name)
      // let modal = createModal(i)
      // } else if () {
      //   // new Video(i, this)
    } else {
      if (cmd === 'foreColor') {
        colorSelector(i, cmd, params)
      } else if (cmd === 'fontSize') {
        fontSizeSelector(i, exec, cmd)
      } else {
        addEvent(i, 'click', e => {
          let isSelectionEmpty = this.isSelectionEmpty()
          if (isSelectionEmpty) {
            this.exec('insertHTML', '&#8203;')
            this._range.setEnd(
              this._range.endContainer,
              this._range.endOffset + 1
            )

            this.saveRange(this._range)
          }

          // this.toolCickHandler(e, cmd, params)

          // if (isSelectionEmpty) {
          //   // 需要将选取折叠起来
          //   // this.selection.collapseRange()
          //   this._range.collapse(false)
          //   this.restoreSelection()
          // }

          let status = this.status(cmd)
          i.classList[status ? 'add' : 'remove']('c-edit-icon-active')
        })
      }
    }

    return i
  }

  toolCickHandler(e, cmd, params) {
    this.exec(cmd, params)
  }

  status(name) {
    return document.queryCommandState(name)
  }

  exec(cmd, params) {
    this.restoreSelection()

    document.execCommand(cmd, false, params)
    this.selection()
    this.restoreSelection()
  }
}

window.Editor = Editor
