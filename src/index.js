import { findEl, setAttr, addEvent, focusEle } from './utils/dom-core'
import config from './config/tools'
import colorSelector from './components/color-selector'
import fontSizeSelector from './components/fontSize-selector'

import { isArray, isPlainObject, forEach } from './utils/funcs'
// import createModal from './components/modal'

import Media from './components/media/index'
// import Video from './components/video/index'
import Paste from './events/paste'

import Selection from './selection/range'

class Editor {
  constructor(selector, config) {
    this.selector = selector
    this.customerConfig = config
    this.init()
  }

  init() {
    this.configInit()
    // dom元素初始化
    this.domInit()

    // 工具栏初始化
    this.toolsInit()

    // selection对象初始化
    this.selectionInit()

    // 事件初始化
    this.eventInit()
    // 选区对象

    // 焦点位置

    new Paste(this)

    this.create()
  }

  configInit() {
    let { tools, options } = this.customerConfig

    // can render icons array
    this.supporNames = Object.keys(config.tools)

    // tools = default or is not an array, use config's tools options
    if ((tools && tools === 'default') || !isPlainObject(tools)) {
      tools = config.tools
    }

    this.config = Object.assign({}, this.customerConfig, config)
  }

  selectionInit() {
    this.selection = new Selection(this)
  }

  domInit() {
    this.container = findEl(this.selector)

    this.editor = document.createElement('div')
    this.editor.classList.add('c-editor-content')

    this.editorWrapper = document.createElement('div')
    this.editorWrapper.classList.add('c-editor-content-wrapper')
    this.editorWrapper.appendChild(this.editor)
    this.container.appendChild(this.editorWrapper)

    setAttr(this.editor, 'contenteditable', true)
  }

  eventInit() {
    addEvent(this.editor, 'blur', () => this.blur())
    addEvent(this.editor, 'focus', () => this.focus())
    addEvent(this.editor, 'keydown', e => this.keydown(e))
    addEvent(this.editor, 'paste', e => this.paste(e))
    addEvent(this.editor, 'keyup', e => this.keyup(e))
  }

  keyup(e) {
    this.selection.saveRange()
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
    this.editor.innerHTML = '<p><br></p>'
    let last = this.editor.children[0]
    // 创建选区
    let _range = document.createRange()
    _range.selectNodeContents(last)
    // 折叠选区
    _range.collapse(false)
    this.selection.saveRange(_range)
    this.selection.restoreSelection()
  }

  find(selector, parent) {
    return findEl(selector, this.editor)
  }

  toolsInit() {
    const { tools } = this.config
    var toolbar = document.createElement('div')

    toolbar.classList.add('c-editor-toolbar-wrapper')

    forEach(tools, (val, key) => {
      if (!this.supporNames.includes(key)) return
      let i = document.createElement('i')

      if (key && typeof key === 'string') {
        i.classList.add(val)
      }

      toolbar.appendChild(i)
    })

    this.container.insertBefore(toolbar, this.editorWrapper)
  }

  focus(e) {}

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
      } else if (cmd === 'bold') {
        addEvent(i, 'click', e => {
          let isEmpty = this.selection.isEmpty()
          if (isEmpty) {
            this.selection.createEmpty()
          }

          this.exec('bold', params)

          if (isEmpty) {
            // 需要将选取折叠起来
            this.selection.collapseRange()
            this.selection.restoreSelection()
          }

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
    this.selection.restoreSelection()
    if (cmd === 'bold') {
      document.execCommand('bold', false)
    } else {
      document.execCommand(cmd, false, params)
    }

    this.selection.saveRange()

    this.selection.restoreSelection()
  }
}

window.Editor = Editor
