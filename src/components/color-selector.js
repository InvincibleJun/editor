import dropModal from './drop-modal'
import Color from '../utils/color'
import { addEvent } from '../utils/dom-core'
import r from '../utils/render'

const createColorPickerElement = function() {
  let refs = {}
  let ele = r(
    'div',
    [
      r(
        'div',
        [
          r('span', null, {
            class: 'c-colorpicker-hue-cursor',
            ref: function(d) {
              refs.cursor = d
            }
          })
        ],
        {
          class: 'c-colorpicker-hue',
          ref: function(d) {
            refs.hue = d
          }
        }
      ),
      r(
        'div',
        [
          r('div', null, { class: 'c-colorpicker-white' }),
          r('div', null, { class: 'c-colorpicker-black' }),
          r('span', null, { class: 'c-colorpicker-cursor' })
        ],
        {
          class: 'c-colorpicker-wrapper'
        }
      ),
      r('input', null, {})
    ],
    {
      ref: function(d) {
        refs.container = d
      }
    }
  )

  return { ele, refs }
}

export default (i, cmd, params) => {
  let { ele, refs } = createColorPickerElement()
  // let d = document.createElement('div')
  const event = {
    open: function() {},
    close: function() {}
  }
  let modal = dropModal(i, ele)

  addEvent(i, 'click')
}
