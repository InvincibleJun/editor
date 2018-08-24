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
    this.toolsInit()
  }

  init() {
    // 选区对象
    this.selection = window.getSelection()
    // 焦点位置
    this.range = false

    this.container = findEl(this.selector)

    this.editor = document.createElement('div')
    this.editor.classList.add('c-editor-content')

    this.editorWrapper = document.createElement('div')
    this.editorWrapper.classList.add('c-editor-content-wrapper')
    this.editorWrapper.appendChild(this.editor)
    this.container.appendChild(this.editorWrapper)

    addEvent(this.editor, 'blur', () => this.blur())
    addEvent(this.editor, 'focus', () => this.focus())
    // addEvent(this.editor, 'paste', e => this.paste(e))

    new Paste(this)

    setAttr(this.editor, 'contenteditable', true)
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

  focus(e) {
    // if (focusEle() !== this.editor) {
    // }
  }

  blur(e) {
    this.range = this.selection.rangeCount
      ? this.selection.getRangeAt(0)
      : false
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
          // this.selection.createEmptyRange()
          this.toolCickHandler(e, cmd, params)
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
    console.log(document.queryCommandState(name))
    return document.queryCommandState(name)
  }

  exec(cmd, params) {
    if (focusEle() !== this.Editor) {
      if (this.range) {
        this.selection.removeAllRanges()
        this.selection.addRange(this.range)
        this.range = false
      }
      this.editor.focus()
    }

    document.execCommand(cmd, false, params)
  }
}

window.Editor = Editor
