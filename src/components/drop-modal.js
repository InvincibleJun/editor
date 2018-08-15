import { addEvent } from '../utils/dom-core'
import animation from './animation'

let uuid = 0

/**
 * 构造弹窗
 * @param {HTMLElement} child 弹出view
 */
const createWrapper = function(child) {
  let wrapper = document.createElement('div')
  wrapper.id = `c-edit-drop-modal-${++uuid}`
  wrapper.classList.add('c-edit-draop-modal-view')
  wrapper.classList.add('c-edit-draop-hide')
  wrapper.appendChild(child)
  document.body.appendChild(wrapper)
  return wrapper
}

export default (el, child, events) => {
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
          wrapper.classList.add('c-zoom-in-top-enter')
        },
        end: () => {
          active = false
        }
      },
      400
    )
  })

  // addEvent(document.body, 'click', function(e) {
  //   if (active) return
  //   animation(
  //     wrapper,
  //     {
  //       active: 'c-zoom-in-top-enter',
  //       enter: 'c-zoom-in-top-enter-active'
  //     },
  //     {
  //       start: () => {
  //         show = false
  //         active = true
  //       },
  //       end: () => {
  //         active = false
  //         show = true
  //         wrapper.style.display = 'none'
  //       }
  //     },
  //     400
  //   )
  // })
}
