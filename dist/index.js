(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  /**
   * 空函数
   */
  var noop = function noop() {};

  var toString = Object.prototype.toString;

  /**
   * 判断是否是plain对象
   * @param {any} obj 源
   */
  var isPlainObject = function isPlainObject(obj) {
    return obj.constructor.prototype === Object.prototype;
  };

  /**
   * 判断是否是数组
   */
  var isArray = function isArray(arr) {
    return arr && toString.call(arr) === '[object Object]';
  };

  /**
   *
   * @param {*} selector 查询器 [string]
   * @param {*} parent 父元素 [htmlelement]
   * @param {*} isArray 是否复数 [boolean]
   */
  var find = function find(selector, parent, isArray$$1) {
    // 参数修正
    if (arguments.length === 2 && typeof arguments[1] === 'boolean') {
      isArray$$1 = parent;
      parent = null;
    }
    return (parent || document)[isArray$$1 ? 'querySelectorAll' : 'querySelector'](selector);
  };

  var setAttr = function setAttr(ele, key, value) {
    ele.setAttribute(key, value);
  };

  /**
   * 绑定事件，并构造闭包解绑函数
   * @param {HTMLElement} ele 触发元素
   * @param {string} hander 触发函数
   * @param {function} fn 触发方法
   * @return {function} 解绑函数
   */
  var addEvent = function addEvent(ele, hander) {
    var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

    var cb = function cb(e) {
      return fn(e);
    };
    ele.addEventListener(hander, cb);
    return function () {
      ele.removeEventListener(hander, cb);
    };
  };

  /**
   * 返回当前焦点dom
   * @return {HTMLElement} 焦点对象
   */
  var focusEle = function focusEle() {
    return document.activeElement;
  };

  var config = [{
    icon: 'icon-bold',
    cmd: 'bold'
  }, {
    icon: 'icon-italic',
    cmd: 'italic'
  }, {
    icon: 'icon-text-left',
    cmd: 'justifyLeft'
  }, {
    icon: 'icon-text-center',
    cmd: 'justifyCenter'
  }, {
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
  }, {
    icon: 'icon-h1',
    cmd: 'foreColor',
    // openModal: true,
    params: 'red'
  }, {
    icon: 'icon-wenzi',
    cmd: 'fontSize'
  }, {
    name: 'image',
    icon: 'icon-image'
    // cmd:

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
  }];

  var animation = function animation(el, option, events, timeout) {
    var _events$start = events.start,
        start = _events$start === undefined ? noop : _events$start,
        _events$end = events.end,
        end = _events$end === undefined ? noop : _events$end;
    var enter = option.enter,
        active = option.active;

    start();
    el.classList.add(enter);

    setTimeout(function () {
      el.classList.remove(enter);
      el.classList.add(active);
    }, 0);

    setTimeout(function () {
      el.classList.remove(active);
      end();
    }, timeout);
  };

  var uuid = 0;

  /**
   * 构造弹窗
   * @param {HTMLElement} child 弹出view
   */
  var createWrapper = function createWrapper(child) {
    var wrapper = document.createElement('div');
    wrapper.id = 'c-edit-drop-modal-' + ++uuid;
    wrapper.classList.add('c-edit-draop-modal-view');
    wrapper.classList.add('c-edit-draop-hide');
    wrapper.appendChild(child);
    document.body.appendChild(wrapper);
    return wrapper;
  };

  var dropModal = (function (el, child, events) {
    var wrapper = createWrapper(child);

    var unbind = addEvent(el, 'click', function (e) {
      e.stopPropagation();

      var _el$getBoundingClient = el.getBoundingClientRect(),
          left = _el$getBoundingClient.left,
          top = _el$getBoundingClient.top,
          height = _el$getBoundingClient.height;

      wrapper.style.left = left + 'px';
      wrapper.style.top = top + height + 'px';
      animation(wrapper, {
        enter: 'c-zoom-in-top-enter',
        active: 'c-zoom-in-top-enter-active'
      }, {
        start: function start() {
          wrapper.style.display = 'block';
          wrapper.classList.add('c-zoom-in-top-enter');
        },
        end: function end() {
        }
      }, 400);
    });

    // addEvent(document.body, 'click', function(e) {
    //   if (active) return
    //   animation(
    //     wrapper,
    //     {
    //       active: 'c-zoom-in-top-enter',
    //       enter: 'c-zoom-in-top-enter-active'
    //     },
    //     {
    //       start: () => {
    //         show = false
    //         active = true
    //       },
    //       end: () => {
    //         active = false
    //         show = true
    //         wrapper.style.display = 'none'
    //       }
    //     },
    //     400
    //   )
    // })
  });

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var rgb2hsv = function rgb2hsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = void 0,
        s = void 0;
    var v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, v: v * 100 };
  };

  // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
  var isOnePointZero = function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
  };

  var isPercentage = function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
  };

  // Take input from [0, n] and return it as [0, 1]
  var bound01 = function bound01(value, max) {
    if (isOnePointZero(value)) value = '100%';

    var processPercent = isPercentage(value);
    value = Math.min(max, Math.max(0, parseFloat(value)));

    // Automatically convert percentage into number
    if (processPercent) {
      value = parseInt(value * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if (Math.abs(value - max) < 0.000001) {
      return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return value % max / parseFloat(max);
  };

  // `hsvToRgb`
  // Converts an HSV color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]
  var hsv2rgb = function hsv2rgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  var hexToRgb = function hexToRgb(s) {
    if (s.length === 3) {
      s = s.split('').map(function (val) {
        return val.repeat(2);
      }).join('');
    }

    var _s$split$filter = s.split(/([a-fA-F0-9]{2})/).filter(function (v) {
      return v;
    }),
        _s$split$filter2 = slicedToArray(_s$split$filter, 3),
        r = _s$split$filter2[0],
        g = _s$split$filter2[1],
        b = _s$split$filter2[2];

    return {
      r: parseInt('0x' + r),
      g: parseInt('0x' + g),
      b: parseInt('0x' + b)
    };
  };

  var Color = function () {
    function Color(_ref) {
      var showAlpha = _ref.showAlpha;
      classCallCheck(this, Color);

      // H 色调
      this._hue = 0;
      // S 饱和度
      this._saturation = 100;
      // L 亮度
      this._value = 100;
      // A 透明度
      this._alpha = 100;

      //
      this._showAlpha = showAlpha;
    }

    createClass(Color, [{
      key: 'init',
      value: function init(value) {
        var checkRgbOrRgba = /^[rR][gG][Bb][Aa]?[\(](2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0?\.\d{1,2}|1|0)?[\)]{1}?$/;
        var checkHex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

        var matchRgb = value.match(checkRgbOrRgba);

        if (matchRgb) {
          this.setHsvAndAlpha(matchRgb[1], matchRgb[2], matchRgb[3], matchRgb[4]);
          return;
        }

        var matchHex = value.match(checkHex);
        if (matchHex) {
          var _hexToRgb = hexToRgb(matchHex[1]),
              r = _hexToRgb.r,
              g = _hexToRgb.g,
              b = _hexToRgb.b;

          this.setHsvAndAlpha(r, g, b);
          return;
        }
      }
    }, {
      key: 'setHsvAndAlpha',
      value: function setHsvAndAlpha(r, g, b, a) {
        // debugger
        if (this._showAlpha && a) {
          this.set('alpha', (a * 100).toFixed(0));
        }

        var _rgb2hsv = rgb2hsv(r, g, b),
            h = _rgb2hsv.h,
            s = _rgb2hsv.s,
            v = _rgb2hsv.v;

        this.set({
          hue: h,
          value: v,
          saturation: s
        });
      }
    }, {
      key: 'set',
      value: function set$$1(key, value) {
        if (arguments.length === 1) {
          for (var i in arguments[0]) {
            this.set(i, arguments[0][i]);
          }
        } else {
          this['_' + key] = value;
        }
      }
    }, {
      key: 'get',
      value: function get$$1(h, s, v) {
        h = h || this._hue;
        s = s || this._saturation;
        v = v || this._value;

        var _hsv2rgb = hsv2rgb(h, s, v),
            r = _hsv2rgb.r,
            g = _hsv2rgb.g,
            b = _hsv2rgb.b;

        var a = this._alpha / 100;
        return this._showAlpha ? { r: r, g: g, b: b, a: a } : { r: r, g: g, b: b };
      }
    }, {
      key: 'getRgbString',
      value: function getRgbString(h, s, v) {
        var _get = this.get(h, s, v),
            r = _get.r,
            g = _get.g,
            b = _get.b,
            a = _get.a;

        return a ? 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')' : 'rgb(' + r + ', ' + g + ', ' + b + ')';
      }

      // // rgb转十六进制
      // rgbToHex(rgbColorstring) {
      //   if (typeof rgbColorstring === 'string' && arguments.length === 1) {
      //     // let [r,g,b] = arguments.split(/\d+/);
      //   } else if (arguments.length === 3) {
      //     let [r, g, b] = arguments

      //     return '#' + r.toString(16) + b.toString(16) + a.toString(16)
      //   } else {
      //     return
      //   }
      // }

    }]);
    return Color;
  }();

  /**
   * 模板渲染函数
   * @param {string} tagName 标签名
   * @param {array<HTMLElement>} childs 子元素
   * @param {object} attrs 属性
   */
  var render = function render(tagName, childs) {
    var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var d = document.createElement(tagName);
    if (Array.isArray(childs)) {
      childs.forEach(function (ele) {
        d.appendChild(ele);
      });
    } else if (childs) {
      d.innerHTML = childs.toString();
    }

    var on = attrs.on;


    if (on && isPlainObject(on)) {
      for (var i in on) {
        if (on.hasOwnProperty(i) && typeof on[i] === 'function') {
          addEvent(d, i, on[i]);
        }
      }
    }

    for (var _i in attrs) {
      if (attrs.hasOwnProperty(_i)) {
        if (_i === 'ref' && typeof attrs[_i] === 'function') {
          // 抛出dom
          attrs[_i](d);
        } else if (_i === 'style') {
          var style = mergeStyle(attrs[_i]);
          d.setAttribute(style, style);
        } else if (_i === 'class' && isArray(attrs[_i])) {
          d.setAttribute(_i, attrs[_i].join(' '));
        } else {
          d.setAttribute(_i, attrs[_i]);
        }
      }
    }
    return d;
  };

  /**
   * 构造style
   * @param {object} style style对象
   */
  var mergeStyle = function mergeStyle(style) {
    if (typeof style === 'string') {
      return style;
    }
    if (isPlainObject(style)) {
      var _style = '';
      for (var i in _style) {
        if (_style.hasOwnProperty(i)) {
          _style += makeStyleName(i) + ':' + _style[i];
        }
      }
    }
  };

  /**
   * 小驼峰转短线链接
   * @param {string} s style属性名
   */
  var makeStyleName = function makeStyleName(s) {
    return s.replace(/[A-Z]/, function (word) {
      return '-' + word.toUpperCase();
    });
  };

  var createColorPickerElement = function createColorPickerElement() {
    var refs = {};
    var ele = render('div', [render('div', [render('span', null, {
      class: 'c-colorpicker-hue-cursor',
      ref: function ref(d) {
        refs.cursor = d;
      }
    })], {
      class: 'c-colorpicker-hue',
      ref: function ref(d) {
        refs.hue = d;
      }
    }), render('div', [render('div', null, { class: 'c-colorpicker-white' }), render('div', null, { class: 'c-colorpicker-black' }), render('span', null, { class: 'c-colorpicker-cursor' })], {
      class: 'c-colorpicker-wrapper'
    }), render('input', null, {})], {
      ref: function ref(d) {
        refs.container = d;
      }
    });

    return { ele: ele, refs: refs };
  };

  var colorSelector = (function (i, cmd, params) {
    var _createColorPickerEle = createColorPickerElement(),
        ele = _createColorPickerEle.ele;
    var modal = dropModal(i, ele);

    addEvent(i, 'click');
  });

  var optionMap = [{ value: 1, size: 14, inner: 'x-small' }, { value: 2, size: 16, inner: 'small' }, { value: 3, size: 18, inner: 'normal' }, { value: 4, size: 20, inner: 'large' }, { value: 5, size: 22, inner: 'x-large' }, { value: 6, size: 24, inner: 'xx-large' }];

  var DropdownView = function DropdownView() {
    var lis = optionMap.map(function (val) {
      return render('li', val.inner, { value: val.value });
    });
    return render('ul', lis, {
      class: 'c-editor-font-size-wrapper'
    });
  };

  var fontSizeSelector = (function (ele, exec, cmd) {
    // ele.
    var childs = DropdownView();
    dropModal(ele, childs);

    addEvent(childs, 'click', function (e) {
      var target = e.target;
      var value = target.getAttribute('value');
      exec(cmd, value);
    });
  });

  var image = (function (i) {
    var child = ImageView();
    console.log(child);
    var modal = dropModal(i, child);
  });

  var ImageView = function ImageView() {
    var s = ['上传', '链接'];
    return render('div', [render('div', [render('span', s[0], {
      on: {
        click: function click() {
          debugger;
        }
      }
    }), render('span', s[1])]), render('div', [UploadImage()], {
      attrs: {
        class: 'c-editor-image-main'
      }
    })]);
  };

  var UploadImage = function UploadImage() {
    return render('input', null, {
      type: 'file',
      on: {
        change: function change(file) {
          var formData = new FormData();
          formData.append('image', file[0]);
          // console.log(file)
        }
      }
    });
  };

  var Editor = function () {
    function Editor(selector, option) {
      classCallCheck(this, Editor);

      this.selector = selector;
      this.option = option;
      this.init();
      this.toolsInit();
    }

    createClass(Editor, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this.selection = getSelection();
        // 焦点位置
        this.range = false;
        this.container = find(this.selector);
        this.editor = document.createElement('div');
        this.editor.classList.add('c-editor-content');

        addEvent(this.editor, 'blur', function () {
          return _this.blur();
        });
        addEvent(this.editor, 'focus', function () {
          return _this.focus();
        });
        setAttr(this.editor, 'contenteditable', true);
        this.container.appendChild(this.editor);
      }
    }, {
      key: 'toolsInit',
      value: function toolsInit() {
        var _this2 = this;

        var toolbar = document.createElement('div');

        toolbar.classList.add('c-editor-toolbar-wrapper');

        config.forEach(function (val, key) {
          var icon = val.icon,
              cmd = val.cmd,
              params = val.params,
              name = val.name;

          var i = _this2.createIcon(icon, cmd, params, name);
          toolbar.appendChild(i);
        });
        this.container.insertBefore(toolbar, this.editor);
      }
    }, {
      key: 'focus',
      value: function focus(e) {
        // if (focusEle() !== this.editor) {
        // }
      }
    }, {
      key: 'blur',
      value: function blur(e) {
        this.range = this.selection.rangeCount ? this.selection.getRangeAt(0) : false;
      }
    }, {
      key: 'createIcon',
      value: function createIcon(icon, cmd, params, name) {
        var _this3 = this;

        var i = document.createElement('i');
        var exec = this.exec.bind(this);

        i.classList.add('iconfont');
        i.classList.add(icon);

        if (name === 'image') {
          image(i);
          // let modal = createModal(i)
        } else {
          if (cmd === 'foreColor') {
            colorSelector(i, cmd, params);
          } else if (cmd === 'fontSize') {
            fontSizeSelector(i, exec, cmd);
          } else {
            addEvent(i, 'click', function (e) {
              // this.selection.createEmptyRange()
              _this3.toolCickHandler(e, cmd, params);
              var status = _this3.status(cmd);
              i.classList[status ? 'add' : 'remove']('c-edit-icon-active');
            });
          }
        }

        return i;
      }
    }, {
      key: 'toolCickHandler',
      value: function toolCickHandler(e, cmd, params) {
        this.exec(cmd, params);
      }
    }, {
      key: 'status',
      value: function status(name) {
        console.log(document.queryCommandState(name));
        return document.queryCommandState(name);
      }
    }, {
      key: 'exec',
      value: function exec(cmd, params) {
        if (focusEle() !== this.Editor) {
          if (this.range) {
            this.selection.removeAllRanges();
            this.selection.addRange(this.range);
            this.range = false;
          }
          this.editor.focus();
        }

        document.execCommand(cmd, false, params);
      }
    }]);
    return Editor;
  }();

  window.Editor = Editor;

})));
