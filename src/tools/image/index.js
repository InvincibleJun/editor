import dropModal from '../../components/drop-modal'
import r from '../../utils/render'
import {
  iframeUpload,
  formDataUpload,
  uploadAjax
} from '../../components/upload'
import { findEl, setAttr, addEvent, focusEle } from '../../utils/dom-core'

const defaultOptions = {
  action: '',
  singleLine: true,
  uploadUrl: false
}

/**
 * 多媒体弹框
 * el {htmlElement} 触发dom对象
 * editor {object} 实例化编辑器
 */
export default class Image {
  constructor(el, editor) {
    this.editor = editor
    this.el = el

    this.options = editor.config.options.image

    this.init()
  }

  init() {
    let modal = dropModal(this.el, this.ImageView)
    let unbinds = ['dragleave', 'drop', 'dragenter', 'dragover'].map(val =>
      addEvent(document, val, e => {
        e.preventDefault()
      })
    )
  }

  insert(url) {
    let template =
      // this.type === 'image'
      `<img src="${url}" style="max-width: 100%;" />`
    // : `<iframe src='${url}' frameborder=0 autoplay="false" ></iframe>`

    if (this.options.singleLine) template += '<p><br /></p>'

    this.editor.exec('insertHTML', template)
  }

  dropFile(e) {
    e.preventDefault()

    // 过滤文件夹和无后缀文件
    var fileList = [].filter.call(e.dataTransfer.files, val => val.type)

    if (fileList.length === 0) return

    for (let i = 0; i < fileList.length; i++) {
      uploadAjax(this.options.action, fileList[i], {
        load: (e, url) => {
          this.insert(url)
        }
      })
    }
  }

  Button(cb) {
    return r('button', '上传', {
      on: {
        click: e => {
          cb(e)
        }
      }
    })
  }

  get ImageView() {
    let status = 0
    let uploadView
    let urlView

    let upload = formDataUpload(this.options.action, {
      change(e) {},
      load: (e, res) => {
        if (!e) {
          this.insert(res)
        }
      }
    })

    let inputUrl = ''

    return r('div', [
      r('div', [
        r('button', '上传', {
          on: {
            click: () => {
              if (status) {
                uploadView.classList.remove('c-editor-hide')
                uploadView.classList.add('c-editor-show')
                urlView.classList.remove('c-editor-show')
                urlView.classList.add('c-editor-hide')
                status = 0
              }
            }
          }
        }),
        r('button', '链接', {
          on: {
            click: () => {
              if (!status) {
                urlView.classList.remove('c-editor-hide')
                urlView.classList.add('c-editor-show')
                uploadView.classList.remove('c-editor-show')
                uploadView.classList.add('c-editor-hide')
                status = 1
              }
            }
          }
        })
      ]),

      r(
        'div',
        [
          r('input', null, {
            type: 'text',
            ref: i => (inputUrl = i),
            placeholder: '请输入图片url'
          }),
          r('button', '提交', {
            on: {
              click: () => {
                let v = inputUrl.value
                // check url include http or https, and is \\
                if (/^\/\/|http:\/\/|https:\/\//gi.test(v)) {
                  this.insert(v)
                }
              }
            }
          })
        ],
        {
          ref: i => (urlView = i),
          class: 'c-editor-hide'
        }
      ),

      r(
        'div',
        [
          r('div', '拖拽区域', {
            on: {
              drop: e => {
                this.dropFile(e)
              },
              click: e => {
                e.stopPropagation()
                upload.select()
              }
            },
            style: {
              width: '200px',
              height: '200px',
              border: '1px solid black'
            }
          }),
          r('button', '提交', {
            on: {
              click: e => {
                upload.send()
              }
            }
          })
        ],
        {
          ref: i => (uploadView = i),
          class: 'c-editor-show'
        }
      )
    ])
  }
}

const LinkImage = function() {
  var input = r('input', [], {
    class: 'c-editor-input'
  })

  return input
}
