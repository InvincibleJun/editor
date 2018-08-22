import render from '../utils/render'

export const formDataUpload = function(url, { change, load }) {
  let file

  let input = render('input', [], {
    type: 'file',
    name: 'file',
    class: 'c-editor-hide'
  })

  document.body.appendChild(input)

  input.click()

  input.onchange = function(e) {
    file = e.target.files[0]
    change(e)
  }

  return {
    select() {
      input.click()
    },
    destory() {
      document.body.removeChild(input)
    },
    send() {
      uploadAjax(url, file, { load })
    }
  }
}

export const uploadAjax = function(url, file, { load }) {
  let xhr = new XMLHttpRequest()

  let form = new FormData()

  form.append('file', file)

  xhr.open('POST', url, true)

  xhr.send(form)

  xhr.onload = function(e) {
    let res = JSON.parse(e.target.response)
    load(null, res.msg.url)
  }
}

export const iframeUpload = function(url, { change, load }) {
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
      style: 'display:none',
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

  document.body.appendChild(iframe)
  document.body.appendChild(form)

  iframe.onload = function(event) {
    let err, result
    try {
      debugger
      console.log(
        document
          .getElementById('upload')
          .contentWindow.document.getElementsByTagName('body')
      )
      result = document
        .getElementById('upload')
        .contentWindow.document.getElementsByTagName('body')
    } catch (e) {
      err = e
    }

    load(err, result)
  }

  input.onchange = function(e) {
    change(e)
  }

  return {
    select() {
      input.click()
    },
    upload() {
      form.submit()
    },
    destory() {
      document.body.removeChild(iframe)
      document.body.removeChild(form)
    }
  }
}
