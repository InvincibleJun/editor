import { find, setAttr, addEvent, focusEle } from '../../utils/dom-core'
import dropModal from '../drop-modal'

import r from '../../utils/render'
import { iframeUpload } from '../upload'

export default i => {
  let child = ImageView()
  console.log(child)
  let modal = dropModal(i, child)
}

const ImageView = function() {
  let s = ['上传', '链接']
  let file

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
    r('div', [UploadImage(f => (file = f))], {
      attr: {
        class: 'c-editor-image-main'
      }
    }),
    r('button', '提交', {
      on: {
        click: e => {
          iframeUpload(file[0], {
            url: 'http://imgtest.357.com/upload/adminpic'
          })
        }
      }
    })
  ])
}

const UploadImage = function(cb) {
  return r('input', null, {
    type: 'file',
    on: {
      change: file => {
        cb(file)
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
