export default (el, func) => {
  const move = function(e) {
    func(e)
  }
  const end = function(e) {
    func(e)
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', end)
  }
  el.addEventListener('mousedown', e => {
    document.onselectstart = function() {
      return false
    }
    document.ondragstart = function() {
      return false
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  })
}
