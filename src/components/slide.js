import r from '../utils/render'

import drag from './drag'
import { noop } from '../utils/funcs'

export default function(option = {}) {
  if (!option.width) return

  const {
    direction = 'Landscape',
    height = 10,
    offset = 2,
    width = 200,
    percent = 0,
    chunkWidth = 4,
    change = noop
  } = option

  let chunk

  const el = r(
    'div',
    [
      r('div', [], {
        style: {
          width: chunkWidth,
          marginLeft: -chunkWidth / 2,
          height: height + offset * 2,
          left: 0,
          top: 0
        },
        ref: i => (chunk = i),

        class: 'c-editor-slide-chunk'
      }),
      r('div', [], {
        class: 'c-editor-slide-container',
        style: {
          width,
          height
        }
      })
    ],
    {
      class: 'c-editor-slide',
      style: {
        width,
        height: height + 2 * offset,
        padding: `${offset}px 0`
      }
    }
  )

  const setOffset = function(o) {
    chunk.style.left = o + 'px'
  }

  const onslide = function(e) {
    let { width, left, height, top } = el.getBoundingClientRect()
    let tmp = e.clientX - left

    tmp = Math.min(tmp, width)
    tmp = Math.max(0, tmp)

    setOffset(tmp)

    change(tmp / width)
  }

  drag(chunk, onslide)

  return el
}
