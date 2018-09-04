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

  let unbindBody = () => {}

  let unbind = addEvent(el, 'click', function(e) {
    if (active) return

    if (show) hide()

    let { left, top, height } = el.getBoundingClientRect()

    el.classList.add('c-edit-icon-active')

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
          unbindBody = addEvent(document.body, 'click', function(e) {
            if (checkTarget(e.target, wrapper)) return
            hide()
          })
        }
      },
      400
    )
  })

  function hide() {
    animation(
      wrapper,
      {
        to: 'c-zoom-in-top-leave',
        active: 'c-zoom-in-top-leave-active'
      },
      {
        start: () => {
          el.classList.remove('c-edit-icon-active')
          active = true
        },
        end: () => {
          active = false
          show = false
          wrapper.style.display = 'none'
          unbindBody()
        }
      },
      400
    )
  }
}

const checkTarget = function(target, ele) {
  while (target) {
    if (ele === target) return true
    if (target === document.body) return false
    target = target.parentNode
  }
}
