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
  }

  for (let i in attrs) {
    if (attrs.hasOwnProperty(i)) {
      if (i === 'on' && isPlainObject(on)) {
        for (let i in on) {
          if (on.hasOwnProperty(i) && typeof on[i] === 'function') {
            addEvent(d, i, on[i])
          }
        }
      } else if (i === 'ref' && typeof attrs[i] === 'function') {
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
    let s = ''
    for (let i in style) {
      if (style.hasOwnProperty(i)) {
        s += `${makeStyleName(i)}:${makeValue(style[i], i)};`
      }
    }
    return s
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

/**
 * 添加单位
 * @param {number} v style属性名
 * @param {string} k style属性值
 * @param {any} 属性值
 */
const makeValue = function(v, k) {
  if (typeof v !== 'number') return v
  if (['width', 'height', 'marginLeft', 'marginRight'].includes(k)) {
    return v + 'px'
  }
  return v
}

export default render
