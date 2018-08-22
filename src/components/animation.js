import { noop } from '../utils/funcs'
const animation = function(el, option, events, timeout) {
  const { start = noop, end = noop } = events
  const { enter = '', active, to = '' } = option
  start()

  enter && el.classList.add(enter)
  to && el.classList.add(to)
  // debugger
  setTimeout(function() {
    el.classList.add(active)
    enter && el.classList.remove(enter)
  }, 0)

  setTimeout(function() {
    el.classList.remove(active)
    to && el.classList.remove(to)
    end()
  }, timeout)
}

export default animation
