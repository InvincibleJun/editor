import { find, setAttr, addEvent } from './utils/dom-core'
import config from './config/tools'

class Editor {
  constructor(selector, option) {
    this.selector = selector
    this.option = option
    this.init()
    this.toolsInit()
  }

  init() {
    this.container = find(this.selector)
    this.editor = document.createElement('div')
    setAttr(this.editor, 'contenteditable', true)
    this.container.appendChild(this.editor)
  }

  toolsInit() {
    var toolbar = document.createElement('div')
    config.forEach((val, key) => {
      const { icon, cmd } = val
      var i = document.createElement('i')
      i.classList.add('iconfont')
      i.classList.add(icon)
      addEvent(i, 'click', () => {
        this.exec(cmd)
      })
      toolbar.appendChild(i)
    })
    this.container.appendChild(toolbar)
  }

  exec(cmd) {
    document.execCommand(cmd, false)
  }
}

window.Editor = Editor
