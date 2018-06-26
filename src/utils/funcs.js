/**
 * 空函数
 */
export const noop = function() {}

/**
 * 判断是否时plain对象
 * @param {any} obj 源
 */
export const isPlainObject = function(obj) {
  return obj.constructor.prototype === Object.prototype
}
