/**
 *
 * @param {*} selector 查询器 [string]
 * @param {*} parent 父元素 [htmlelement]
 * @param {*} isArray 是否复数 [boolean]
 */
export const find = function(selector, parent, isArray) {
  // 参数修正
  if (arguments.length === 2 && typeof arguments[1] === 'boolean') {
    isArray = parent
    parent = null
  }
  return (parent || document)[isArray ? 'querySelectorAll' : 'querySelector'](
    selector
  )
}

export const setAttr = function(ele, key, value) {
  ele.setAttribute(key, value)
}

export const addEvent = function(ele, hander, fn) {
  ele.addEventListener(hander, e => fn(e))
}
