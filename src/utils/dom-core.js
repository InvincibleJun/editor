import { noop } from './funcs'

/**
 *
 * @param {*} selector 查询器 [string]
 * @param {*} parent 父元素 [htmlelement]
 * @param {*} isArray 是否复数 [boolean]
 */
export const findEl = function(selector, parent, isArray) {
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

/**
 * 绑定事件，并构造闭包解绑函数
 * @param {HTMLElement} ele 触发元素
 * @param {string} hander 触发函数
 * @param {function} fn 触发方法
 * @return {function} 解绑函数
 */
export const addEvent = function(ele, hander, fn = noop) {
  let cb = e => fn(e)
  ele.addEventListener(hander, cb)
  return function() {
    ele.removeEventListener(hander, cb)
  }
}

/**
 * 返回当前焦点dom
 * @return {HTMLElement} 焦点对象
 */
export const focusEle = function() {
  return document.activeElement
}

/**
 * 判断是否时plain对象
 * @param {any} obj 源
 */
export const isPlainObject = function(obj) {
  return obj.constructor.prototype === Object.prototype
}
