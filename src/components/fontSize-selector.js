import render from '../utils/render'
import dropModal from './drop-modal'
import { addEvent } from '../utils/dom-core'

const optionMap = [
  { value: 1, size: 14, inner: 'x-small' },
  { value: 2, size: 16, inner: 'small' },
  { value: 3, size: 18, inner: 'normal' },
  { value: 4, size: 20, inner: 'large' },
  { value: 5, size: 22, inner: 'x-large' },
  { value: 6, size: 24, inner: 'xx-large' }
]

const DropdownView = function() {
  let lis = optionMap.map(val => render('li', val.inner, { value: val.value }))
  return render('ul', lis, {
    class: 'c-editor-font-size-wrapper'
  })
}

export default (ele, exec, cmd) => {
  // ele.
  var childs = DropdownView()
  dropModal(ele, childs)

  addEvent(childs, 'click', e => {
    let target = e.target
    let value = target.getAttribute('value')
    exec(cmd, value)
  })
}
