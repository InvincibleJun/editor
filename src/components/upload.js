import render from '../utils/render'

export const formDataUpload = function(file, { url }) {
  if (file && url && typeof url === 'string') {
    let xhr = new XMLHttpRequest()
    let form = new FormData()
    form.append('file', file)
    xhr.open('POST', url, true)
    xhr.send(form)
    xhr.onload = function(e) {
      console.log(e)
    }
  }
}

export const iframeUpload = function(file, { url }) {
  let target = 'upload'
  let input

  let form = render(
    'form',
    [
      render('input', null, {
        type: 'file',
        name: 'file',
        ref: i => (input = i)
      })
    ],
    {
      action: url,
      enctype: 'multipart/form-data',
      target,
      method: 'post'
    }
  )

  let iframe = render('iframe', null, {
    id: 'upload',
    name: 'upload',
    style: 'display:none'
  })

  iframe.onload = function(e) {
    var _result = JSON.parse(
      this.contentDocument.getElementsByTagName('body')[0].innerHTML
    )
  }
  document.body.appendChild(iframe)

  document.body.appendChild(form)

  input.value = file
  form.submit()
}
