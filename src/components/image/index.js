import { find, setAttr, addEvent, focusEle } from '../../utils/dom-core'
import dropModal from '../drop-modal'

import r from '../../utils/render'

export default i => {
  let child = ImageView()
  console.log(child)
  let modal = dropModal(i, child)
}

const ImageView = function() {
  let s = ['上传', '链接']
  return r('div', [
    r('div', [
      r('span', s[0], {
        on: {
          click: () => {
            debugger
          }
        }
      }),
      r('span', s[1])
    ]),
    r('div', [UploadImage()], {
      attrs: {
        class: 'c-editor-image-main'
      }
    })
  ])
}

const UploadImage = function() {
  return r('input', null, {
    type: 'file',
    on: {
      change: file => {
        var formData = new FormData()
        formData.append('image', file[0])
        // console.log(file)
      }
    }
  })
}

const LinkImage = function() {
  var input = r('input', [], {
    class: 'c-editor-input'
  })

  return input
}
