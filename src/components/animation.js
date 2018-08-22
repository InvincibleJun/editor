import { noop } from '../utils/funcs'
const animation = function(el, option, events, timeout) {
  const { start = noop, end = noop } = events
  const { enter, active } = option
  start()
  el.classList.add(enter)

  setTimeout(function() {
    el.classList.remove(enter)
    el.classList.add(active)
  }, 0)

  setTimeout(function() {
    el.classList.remove(active)
    end()
  }, timeout)
}

export default animation
