export default [
  {
    icon: 'icon-bold',
    cmd: 'bold'
  },
  {
    icon: 'icon-italic',
    cmd: 'italic'
  },

  {
    icon: 'icon-text-left',
    cmd: 'justifyLeft'
  },
  {
    icon: 'icon-text-center',
    cmd: 'justifyCenter'
  },
  {
    icon: 'icon-text-right',
    cmd: 'justifyRight'
  },
  // 下划线
  {
    icon: 'icon-underline',
    cmd: 'underline'
  },

  // heading 目前只有firefox兼容, 统一采用formatBlock
  {
    icon: 'icon-heading-1',
    cmd: 'formatBlock',
    params: 'h1'
  },

  {
    icon: 'icon-h1',
    cmd: 'foreColor',
    // openModal: true,
    params: 'red'
  },

  {
    icon: 'icon-wenzi',
    cmd: 'fontSize'
  },
  {
    name: 'image',
    icon: 'icon-image'
    // cmd:
  }
  // //在插入点或者选中文字上创建一个有序列表
  // {
  //   icon: 'icon-h1',
  //   cmd: 'insertOrderedList'
  // },

  // //在插入点或者选中文字上创建一个无序列表
  // {
  //   icon: 'icon-h1',
  //   cmd: 'insertOrderedList'
  // }
]
