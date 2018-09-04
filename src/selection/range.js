export default class Selection {
  constructor(editor) {
    this.Ed = editor
    this._range = null
  }

  getRange() {
    return this._range
  }

  // 保存光标位置
  saveRange(_range) {
    if (_range) {
      this._range = _range
      return
    }

    const selection = window.getSelection()

    if (selection.rangeCount === 0) return

    // selection可包含多个range对象，一般而言取第一个
    this._range = selection.getRangeAt(0)
  }

  // 恢复选区
  restoreSelection() {
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(this._range)
  }

  // 选区是否为空
  isEmpty() {
    const { _range } = this
    return (
      _range &&
      _range.startContainer === _range.endContainer &&
      _range.startOffset === _range.endOffset
    )
  }

  createEmpty() {
    // if (!range) return
    const range = this.getRange()

    try {
      this.Ed.exec('insertHTML', '&#8203;')
      range.setEnd(range.endContainer, range.endOffset + 1)
      this.saveRange(range)
      //
    } catch (e) {
      console.log(e)
    }
  }

  // 折叠选区
  /**
   * @parmas [boolean]
   **/
  collapseRange(toStart = false) {
    this._range && this._range.collapse(toStart)
  }
}
