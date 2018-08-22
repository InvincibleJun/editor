import dropModal from '../drop-modal'
import r from '../../utils/render'

export default class Video {
  constructor(ele, editor) {
    // super(props)
    this.ele = ele
    this.ed = editor
    // this.state = {}
    this.init()
  }

  init() {
    let modal = dropModal(this.ele, this.render())

    this.render()
  }

  render() {
    return
  }
}
