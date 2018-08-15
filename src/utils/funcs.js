/**
 * 空函数
 */
export const noop = function() {}

const toString = Object.prototype.toString

/**
 * 判断是否是plain对象
 * @param {any} obj 源
 */
export const isPlainObject = function(obj) {
  return obj.constructor.prototype === Object.prototype
}

/**
 * 判断是否是数组
 */
export const isArray = function(arr) {
  return arr && toString.call(arr) === '[object Object]'
}
