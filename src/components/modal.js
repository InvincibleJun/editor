const template = function(params) {
  // return `<div class='c-editor-modal'></div>`
}

const createModal = function(i, el) {
  var tem = document.createElement('div')
  tem.className = 'c-editor-modal'
  tem.appendChild(el)
  // document.body.appendChild(tem)
  // tem.
  return {
    open: makeOpenFunc(tem),
    close
  }
}

const makeOpenFunc = function(el) {
  return e => {
    console.log(e)
  }
}

export default createModal
