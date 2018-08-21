import { isPlainObject, isArray } from './funcs'
import { addEvent } from './dom-core'

/**
 * 模板渲染函数
 * @param {string} tagName 标签名
 * @param {array<HTMLElement>} childs 子元素
 * @param {object} attrs 属性
 */
const render = function(tagName, childs, attrs = {}) {
  let d = document.createElement(tagName)
  if (Array.isArray(childs)) {
    childs.forEach(ele => {
      d.appendChild(ele)
    })
  } else if (childs) {
    d.innerHTML = childs.toString()
  }

  const { on } = attrs

  if (on && isPlainObject(on)) {
    for (let i in on) {
      if (on.hasOwnProperty(i) && typeof on[i] === 'function') {
        addEvent(d, i, on[i])
      }
    }
  }

  for (let i in attrs) {
    if (attrs.hasOwnProperty(i)) {
      if (i === 'ref' && typeof attrs[i] === 'function') {
        // 抛出dom
        attrs[i](d)
      } else if (i === 'style') {
        let style = mergeStyle(attrs[i])
        d.setAttribute('style', style)
      } else if (i === 'class' && isArray(attrs[i])) {
        d.setAttribute(i, attrs[i].join(' '))
      } else {
        d.setAttribute(i, attrs[i])
      }
    }
  }
  return d
}

/**
 * 构造style
 * @param {object} style style对象
 */
const mergeStyle = function(style) {
  if (typeof style === 'string') {
    return style
  }
  if (isPlainObject(style)) {
    let style = ''
    for (let i in style) {
      if (style.hasOwnProperty(i)) {
        style += `${makeStyleName(i)}:${style[i]}`
      }
    }
  }
}

/**
 * 小驼峰转短线链接
 * @param {string} s style属性名
 */
const makeStyleName = function(s) {
  return s.replace(/[A-Z]/, function(word) {
    return `-${word.toUpperCase()}`
  })
}

export default render
