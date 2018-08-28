import { addEvent, setAttr } from '../utils/dom-core'
import { uploadAjax } from '../components/upload'
// import craeteUuid from '../utils/uuid'
let uuid = 0

export default class Paste {
  constructor(editor) {
    this.ed = editor
    // this.exec = exec
    this.init()
  }

  init() {
    addEvent(this.ed.editor, 'paste', e => this.entry(e))
  }

  entry(e) {
    e.preventDefault()
    let clipboardData = event.clipboardData || window.clipboardData
    let { items } = clipboardData
    if (clipboardData && items) {
      Object.keys(items).forEach(key => {
        let item = items[key]
        let { kind, type } = item
        if (kind === 'file') {
          let id = uuid++
          let file = item.getAsFile()
          uploadAjax('http://imgtest.357.com/upload/adminpic', file, {
            load: (e, url) => {
              if (!e) {
                setAttr(this.ed.find(`.image-upload-${id}`), 'src', url)
                setAttr(this.ed.find(`.image-upload-${id}`), 'class', '')
              }
            }
          })

          let r = new FileReader()
          r.readAsDataURL(file)
          r.onload = e => {
            var base64 = e.target.result
            this.ed.exec(
              'insertHTML',
              `<div><img src=${base64} class="image-upload-${id}" style="max-width:100%" /></div>`
            )
          }
        } else if (type === 'text/html') {
          let uuid = 1

          item.getAsString(s => {
            s = s
              .replace(/<(div|p|img|a|span)([^>]+)>/gi, (word, $1, $2) => {
                if ($1 === 'img') {
                  // 外链图片处理
                  let match = word.match(/<img[^>]+src=['"]([^>\s"']+)[^>]+>/i)
                  return match && match[1]
                    ? `<img class="${uuid}" width="100" height="100" src="${
                        match[1]
                      }">`
                    : word
                }
                return word.replace($2, '')
              })
              .replace(/<!--(StartFragment|EndFragment)-->/, '')

            this.ed.exec('insertHTML', s)
          })
        }
      })
    }
  }
}
