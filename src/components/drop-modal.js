import { addEvent } from '../utils/dom-core'
import animation from './animation'

let uuid = 0

let modal = []

/**
 * 构造弹窗
 * @param {HTMLElement} child 弹出view
 */
const createWrapper = function(child) {
  let wrapper = document.createElement('div')
  wrapper.id = `c-edit-drop-modal-${uuid}`
  wrapper.classList.add('c-edit-drop-modal-view')
  wrapper.classList.add('c-edit-drop-hide')
  wrapper.appendChild(child)
  document.body.appendChild(wrapper)
  return wrapper
}

export default (el, child, events) => {
  ++uuid
  let wrapper = createWrapper(child)

  let show = false
  let active = false

  let unbind = addEvent(el, 'click', function(e) {
    e.stopPropagation()
    let { left, top, height } = el.getBoundingClientRect()
    wrapper.style.left = left + 'px'
    wrapper.style.top = top + height + 'px'
    animation(
      wrapper,
      {
        enter: 'c-zoom-in-top-enter',
        active: 'c-zoom-in-top-enter-active'
      },
      {
        start: () => {
          show = true
          active = true
          wrapper.style.display = 'block'
        },
        end: () => {
          active = false
        }
      },
      400
    )
  })

  addEvent(document.body, 'click', function(e) {
    console.log(checkTarget(e.target, wrapper))
    if (active) return
    animation(
      wrapper,
      {
        enter: 'c-zoom-in-top-leave-active',
        active: 'c-zoom-in-top-leave'
      },
      {
        start: () => {
          show = false
          active = true
        },
        end: () => {
          active = false
          show = true
          wrapper.style.display = 'none'
        }
      },
      400
    )
  })
}

const checkTarget = function(target, ele) {
  while (ele) {
    if (ele === document.body) return false
    if (ele === target) return true
    ele = ele.parent
  }
  // while (el) {

  // }
}
