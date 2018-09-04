(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
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
    return arr && toString.call(arr) === '[object Array]';
  };

  /**
   * 对象遍历
   * @param {object} obj 源
   * @param {function} fn 遍历器
   */
  var forEach = function forEach(obj, fn) {
    if (!isPlainObject(obj)) return;
    Object.keys(obj).forEach(function (key) {
      return fn(obj[key], key, obj);
    });
  };

  /**
   *
   * @param {*} selector 查询器 [string]
   * @param {*} parent 父元素 [htmlelement]
   * @param {*} isArray 是否复数 [boolean]
   */
  var findEl = function findEl(selector, parent, isArray$$1) {
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

  var config = {
    tools: {
      bold: 'iconfont icon-bold',
      italic: 'iconfont icon-italic',
      justifyLeft: 'iconfont icon-text-left',
      justifyCenter: 'iconfont icon-text-center',
      justifyRight: 'iconfont icon-text-right',
      // underline: 'iconfont icon-underline',
      // foreColor: 'iconfont icon-h1',
      fontSize: 'iconfont icon-wenzi',
      image: 'iconfont icon-image',
      video: 'iconfont icon-shipin',
      color: 'iconfont icon-kechengliebiao'
    },
    options: {
      image: {
        // 图片单行显示
        singleLine: true,
        uploadUrl: true,
        // 上传路径
        action: 'http://imgtest.357.com/upload/adminpic'
      },
      video: {
        action: 'http://imgtest.357.com/upload/adminvideo'
      }
    }
  };

  var animation = function animation(el, option, events, timeout) {
    var _events$start = events.start,
        start = _events$start === undefined ? noop : _events$start,
        _events$end = events.end,
        end = _events$end === undefined ? noop : _events$end;
    var _option$enter = option.enter,
        enter = _option$enter === undefined ? '' : _option$enter,
        active = option.active,
        _option$to = option.to,
        to = _option$to === undefined ? '' : _option$to;

    start();

    enter && el.classList.add(enter);
    to && el.classList.add(to);

    setTimeout(function () {
      el.classList.add(active);
      enter && el.classList.remove(enter);
    }, 0);

    setTimeout(function () {
      el.classList.remove(active);
      to && el.classList.remove(to);
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
    wrapper.id = 'c-edit-drop-modal-' + uuid;
    wrapper.classList.add('c-edit-drop-modal-view');
    wrapper.classList.add('c-edit-drop-hide');
    wrapper.appendChild(child);
    document.body.appendChild(wrapper);
    return wrapper;
  };

  var dropModal = (function (el, child, events) {
    ++uuid;

    var wrapper = createWrapper(child);

    var show = false;

    var active = false;

    var unbindBody = function unbindBody() {};

    var unbind = addEvent(el, 'click', function (e) {
      if (active) return;

      if (show) hide();

      var _el$getBoundingClient = el.getBoundingClientRect(),
          left = _el$getBoundingClient.left,
          top = _el$getBoundingClient.top,
          height = _el$getBoundingClient.height;

      el.classList.add('c-edit-icon-active');

      wrapper.style.left = left + 'px';

      wrapper.style.top = top + height + 'px';

      animation(wrapper, {
        enter: 'c-zoom-in-top-enter',
        active: 'c-zoom-in-top-enter-active'
      }, {
        start: function start() {
          show = true;
          active = true;
          wrapper.style.display = 'block';
        },
        end: function end() {
          active = false;
          unbindBody = addEvent(document.body, 'click', function (e) {
            if (checkTarget(e.target, wrapper)) return;
            hide();
          });
        }
      }, 400);
    });

    function hide() {
      animation(wrapper, {
        to: 'c-zoom-in-top-leave',
        active: 'c-zoom-in-top-leave-active'
      }, {
        start: function start() {
          el.classList.remove('c-edit-icon-active');
          active = true;
        },
        end: function end() {
          active = false;
          show = false;
          wrapper.style.display = 'none';
          unbindBody();
        }
      }, 400);
    }
  });

  var checkTarget = function checkTarget(target, ele) {
    while (target) {
      if (ele === target) return true;
      if (target === document.body) return false;
      target = target.parentNode;
    }
  };

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

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

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


    if (on && isPlainObject(on)) ;

    for (var i in attrs) {
      if (attrs.hasOwnProperty(i)) {
        if (i === 'on' && isPlainObject(on)) {
          for (var _i in on) {
            if (on.hasOwnProperty(_i) && typeof on[_i] === 'function') {
              addEvent(d, _i, on[_i]);
            }
          }
        } else if (i === 'ref' && typeof attrs[i] === 'function') {
          // 抛出dom
          attrs[i](d);
        } else if (i === 'style') {
          var style = mergeStyle(attrs[i]);
          d.setAttribute('style', style);
        } else if (i === 'class' && isArray(attrs[i])) {
          d.setAttribute(i, attrs[i].join(' '));
        } else {
          d.setAttribute(i, attrs[i]);
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
      var s = '';
      for (var i in style) {
        if (style.hasOwnProperty(i)) {
          s += makeStyleName(i) + ':' + makeValue(style[i], i) + ';';
        }
      }
      return s;
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

  /**
   * 添加单位
   * @param {number} v style属性名
   * @param {string} k style属性值
   * @param {any} 属性值
   */
  var makeValue = function makeValue(v, k) {
    if (typeof v !== 'number') return v;
    if (['width', 'height', 'marginLeft', 'marginRight'].includes(k)) {
      return v + 'px';
    }
    return v;
  };

  var formDataUpload = function formDataUpload(url, _ref) {
    var change = _ref.change,
        load = _ref.load;

    var file = void 0;

    var input = render('input', [], {
      type: 'file',
      name: 'file',
      class: 'c-editor-hide'
    });

    document.body.appendChild(input);

    input.click();

    input.onchange = function (e) {
      file = e.target.files[0];
      change(e);
    };

    input.onclick = function (e) {
      e.stopPropagation();
    };

    return {
      select: function select() {
        input.click();
      },
      destory: function destory() {
        document.body.removeChild(input);
      },
      send: function send() {
        uploadAjax(url, file, { load: load });
      }
    };
  };

  var uploadAjax = function uploadAjax(url, file, _ref2) {
    var _ref2$load = _ref2.load,
        load = _ref2$load === undefined ? function () {} : _ref2$load;

    var xhr = new XMLHttpRequest();

    var form = new FormData();

    form.append('file', file);

    xhr.open('POST', url, true);

    xhr.send(form);

    xhr.onload = function (e) {
      var res = JSON.parse(e.target.response);
      load(null, res.msg.url);
    };
  };

  /**
   * 多媒体弹框
   * hanlderELement {htmlElement} 触发dom对象
   * editor {object} 实例化编辑器
   */

  var Image = function () {
    function Image(hanlderELement, editor, type) {
      classCallCheck(this, Image);

      this.editor = editor;
      this.ele = hanlderELement;

      this.options = editor.config;
      debugger;
      this.init();
    }

    createClass(Image, [{
      key: 'init',
      value: function init() {
        var modal = dropModal(this.ele, this.ImageView);
        var unbinds = ['dragleave', 'drop', 'dragenter', 'dragover'].map(function (val) {
          return addEvent(document, val, function (e) {
            e.preventDefault();
          });
        });
      }
    }, {
      key: 'insert',
      value: function insert(url) {
        var template = this.type === 'image' ? '<img src="' + url + '" style="max-width: 100%;" />' : '<iframe src=\'' + url + '\' frameborder=0 autoplay="false" ></iframe>';

        if (this.options.singleLine) template += '<p><br /></p>';

        this.ed.exec('insertHTML', template);
      }
    }, {
      key: 'dropFile',
      value: function dropFile(e) {
        var _this = this;

        e.preventDefault();

        // 过滤文件夹和无后缀文件
        var fileList = [].filter.call(e.dataTransfer.files, function (val) {
          return val.type;
        });

        if (fileList.length === 0) return;

        for (var i = 0; i < fileList.length; i++) {
          uploadAjax(this.options.action, fileList[i], {
            load: function load(e, url) {
              _this.insert(url);
            }
          });
        }
      }
    }, {
      key: 'Button',
      value: function Button(cb) {
        return render('button', '上传', {
          on: {
            click: function click(e) {
              cb(e);
            }
          }
        });
      }
    }, {
      key: 'ImageView',
      get: function get$$1() {
        var _this2 = this;

        var status = 0;
        var uploadView = void 0;
        var urlView = void 0;

        var upload = formDataUpload(this.options.action, {
          change: function change(e) {},

          load: function load(e, res) {
            if (!e) {
              _this2.insert(res);
            }
          }
        });

        var inputUrl = '';

        return render('div', [render('div', [render('button', '上传', {
          on: {
            click: function click() {
              if (status) {
                uploadView.classList.remove('c-editor-hide');
                uploadView.classList.add('c-editor-show');
                urlView.classList.remove('c-editor-show');
                urlView.classList.add('c-editor-hide');
                status = 0;
              }
            }
          }
        }), render('button', '链接', {
          on: {
            click: function click() {
              if (!status) {
                urlView.classList.remove('c-editor-hide');
                urlView.classList.add('c-editor-show');
                uploadView.classList.remove('c-editor-show');
                uploadView.classList.add('c-editor-hide');
                status = 1;
              }
            }
          }
        })]), render('div', [render('input', null, {
          type: 'text',
          ref: function ref(i) {
            return inputUrl = i;
          },
          placeholder: '请输入图片url'
        }), render('button', '提交', {
          on: {
            click: function click() {
              var v = inputUrl.value;
              // check url include http or https, and is \\
              if (/^\/\/|http:\/\/|https:\/\//gi.test(v)) {
                _this2.insert(v);
              }
            }
          }
        })], {
          ref: function ref(i) {
            return urlView = i;
          },
          class: 'c-editor-hide'
        }), render('div', [render('div', '拖拽区域', {
          on: {
            drop: function drop(e) {
              _this2.dropFile(e);
            },
            click: function click(e) {
              e.stopPropagation();
              upload.select();
            }
          },
          style: {
            width: '200px',
            height: '200px',
            border: '1px solid black'
          }
        }), render('button', '提交', {
          on: {
            click: function click(e) {
              upload.send();
            }
          }
        })], {
          ref: function ref(i) {
            return uploadView = i;
          },
          class: 'c-editor-show'
        })]);
      }
    }]);
    return Image;
  }();

  // import craeteUuid from '../utils/uuid'
  var uuid$1 = 0;

  var Paste = function () {
    function Paste(editor) {
      classCallCheck(this, Paste);

      this.ed = editor;
      this.init();
    }

    createClass(Paste, [{
      key: 'init',
      value: function init() {
        var _this = this;

        addEvent(this.ed.editor, 'paste', function (e) {
          return _this.entry(e);
        });
      }
    }, {
      key: 'entry',
      value: function entry(e) {
        var _this2 = this;

        e.preventDefault();
        var clipboardData = event.clipboardData || window.clipboardData;
        var items = clipboardData.items;

        if (clipboardData && items) {
          Object.keys(items).forEach(function (key) {
            var item = items[key];
            var kind = item.kind,
                type = item.type;

            if (kind === 'file') {
              var id = uuid$1++;
              var file = item.getAsFile();
              uploadAjax('http://imgtest.357.com/upload/adminpic', file, {
                load: function load(e, url) {
                  if (!e) {
                    setAttr(_this2.ed.find('.image-upload-' + id), 'src', url);
                    setAttr(_this2.ed.find('.image-upload-' + id), 'class', '');
                  }
                }
              });

              var r = new FileReader();
              r.readAsDataURL(file);
              r.onload = function (e) {
                var base64 = e.target.result;
                _this2.ed.exec('insertHTML', '<div><img src=' + base64 + ' class="image-upload-' + id + '" style="max-width:100%" /></div>');
              };
            } else if (type === 'text/html') {
              var _uuid = 1;

              item.getAsString(function (s) {
                // debugger

                s = s.replace(/<(div|p|img|a|span)([^>]+)>/gi, function (word, $1, $2) {
                  if ($1 === 'img') {
                    // 外链图片处理
                    var match = word.match(/<img[^>]+src=['"]([^>\s"']+)[^>]+>/i);
                    return match && match[1] ? '<img class="' + _uuid + '" width="100" height="100" src="' + match[1] + '">' : word;
                  }
                  return word.replace($2, '');
                }).replace(/<!--(StartFragment|EndFragment)-->/, '');

                _this2.ed.exec('insertHTML', s);
              });
            } else if (type === 'text/plain') {
              item.getAsString(function (s) {
                _this2.ed.exec('insertHTML', s);
              });
            }
          });
        }
      }
    }]);
    return Paste;
  }();

  var Selection = function () {
    function Selection(editor) {
      classCallCheck(this, Selection);

      this.Ed = editor;
      this._range = null;
    }

    createClass(Selection, [{
      key: 'getRange',
      value: function getRange() {
        return this._range;
      }

      // 保存光标位置

    }, {
      key: 'saveRange',
      value: function saveRange(_range) {
        if (_range) {
          this._range = _range;
          return;
        }

        var selection = window.getSelection();

        if (selection.rangeCount === 0) return;

        // selection可包含多个range对象，一般而言取第一个
        this._range = selection.getRangeAt(0);
      }

      // 恢复选区

    }, {
      key: 'restoreSelection',
      value: function restoreSelection() {
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(this._range);
      }

      // 选区是否为空

    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        var _range = this._range;

        return _range && _range.startContainer === _range.endContainer && _range.startOffset === _range.endOffset;
      }
    }, {
      key: 'createEmpty',
      value: function createEmpty() {
        // if (!range) return
        var range = this.getRange();

        try {
          this.Ed.exec('insertHTML', '&#8203;');
          range.setEnd(range.endContainer, range.endOffset + 1);
          this.saveRange(range);
          //
        } catch (e) {
          console.log(e);
        }
      }

      // 折叠选区
      /**
       * @parmas [boolean]
       **/

    }, {
      key: 'collapseRange',
      value: function collapseRange() {
        var toStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this._range && this._range.collapse(toStart);
      }
    }]);
    return Selection;
  }();

  var Bold = function () {
    function Bold(el, editor) {
      classCallCheck(this, Bold);

      this.el = el;
      this.editor = editor;
      this._cmd = 'bold';
      this._status = false;
      this.init();
    }

    createClass(Bold, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this._resigter = addEvent(this.el, 'click', function (e) {
          return _this.hanlderClick(e);
        });
      }
    }, {
      key: 'hanlderClick',
      value: function hanlderClick() {
        var isEmpty = this.editor.selection.isEmpty();

        if (isEmpty) {
          this.editor.selection.createEmpty();
        }

        this.editor.exec(this._cmd);

        if (isEmpty) {
          // 需要将选取折叠起来
          this.editor.selection.collapseRange();
          this.editor.selection.restoreSelection();
        }

        this._status = this.editor.status(this._cmd);
        this.toggleActive(this._status);
      }
    }, {
      key: 'toggleActive',
      value: function toggleActive(status) {
        this.el.classList[status ? 'add' : 'remove']('c-edit-icon-active');
      }
    }, {
      key: 'destory',
      value: function destory() {
        this._resigter();
      }
    }]);
    return Bold;
  }();

  var Italic = function () {
    function Italic(el, editor) {
      classCallCheck(this, Italic);

      this.el = el;
      this.editor = editor;
      this._cmd = 'italic';
      this._status = false;
      this.init();
    }

    createClass(Italic, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this._resigter = addEvent(this.el, 'click', function (e) {
          return _this.hanlderClick(e);
        });
      }
    }, {
      key: 'hanlderClick',
      value: function hanlderClick() {
        var isEmpty = this.editor.selection.isEmpty();

        if (isEmpty) {
          this.editor.selection.createEmpty();
        }

        this.editor.exec(this._cmd);

        if (isEmpty) {
          // 需要将选取折叠起来
          this.editor.selection.collapseRange();
          this.editor.selection.restoreSelection();
        }

        this._status = this.editor.status(this._cmd);
        this.toggleActive(this._status);
      }
    }, {
      key: 'toggleActive',
      value: function toggleActive(status) {
        this.el.classList[status ? 'add' : 'remove']('c-edit-icon-active');
      }
    }, {
      key: 'destory',
      value: function destory() {
        this._resigter();
      }
    }]);
    return Italic;
  }();

  var Image$1 = function () {
    function Image(el, editor) {
      classCallCheck(this, Image);

      this.editor = editor;
      this.el = el;

      this.options = editor.config.options.image;

      this.init();
    }

    createClass(Image, [{
      key: 'init',
      value: function init() {
        var modal = dropModal(this.el, this.ImageView);
        var unbinds = ['dragleave', 'drop', 'dragenter', 'dragover'].map(function (val) {
          return addEvent(document, val, function (e) {
            e.preventDefault();
          });
        });
      }
    }, {
      key: 'insert',
      value: function insert(url) {
        var template =
        // this.type === 'image'
        '<img src="' + url + '" style="max-width: 100%;" />';
        // : `<iframe src='${url}' frameborder=0 autoplay="false" ></iframe>`

        if (this.options.singleLine) template += '<p><br /></p>';

        this.editor.exec('insertHTML', template);
      }

      // reset() {
      //
      // }

    }, {
      key: 'dropFile',
      value: function dropFile(e) {
        var _this = this;

        e.preventDefault();

        // 过滤文件夹和无后缀文件
        var fileList = [].filter.call(e.dataTransfer.files, function (val) {
          return val.type;
        });

        if (fileList.length === 0) return;

        for (var i = 0; i < fileList.length; i++) {
          uploadAjax(this.options.action, fileList[i], {
            load: function load(e, url) {
              _this.insert(url);
            }
          });
        }
      }
    }, {
      key: 'ImageView',
      get: function get$$1() {
        var _this2 = this;

        var status = 0;
        var uploadView = void 0;
        var urlView = void 0;

        var upload = formDataUpload(this.options.action, {
          change: function change(e) {
            upload.send();
          },

          load: function load(e, res) {
            if (!e) {
              _this2.insert(res);
            }
          }
        });

        var inputUrl = '';

        var labelUpload = void 0;
        var labelLink = void 0;

        return render('div', [render('div', [render('span', '上传', {
          class: 'c-editor-label c-editor-label-active',

          on: {
            click: function click() {
              if (status) {
                uploadView.classList.remove('c-editor-hide');
                uploadView.classList.add('c-editor-show');
                urlView.classList.remove('c-editor-show');
                urlView.classList.add('c-editor-hide');
                labelLink.classList.remove('c-editor-label-active');
                labelUpload.classList.add('c-editor-label-active');
                status = 0;
              }
            }
          },
          ref: function ref(i) {
            return labelUpload = i;
          }
        }), render('span', null, {
          class: 'c-editor-label-mid'
        }), render('span', '链接', {
          class: 'c-editor-label',
          on: {
            click: function click() {
              if (!status) {
                urlView.classList.remove('c-editor-hide');
                urlView.classList.add('c-editor-show');
                uploadView.classList.remove('c-editor-show');
                uploadView.classList.add('c-editor-hide');
                labelUpload.classList.remove('c-editor-label-active');
                labelLink.classList.add('c-editor-label-active');
                status = 1;
              }
            }
          },
          ref: function ref(i) {
            return labelLink = i;
          }
        })], {
          class: 'c-editor-modal-title'
        }), render('div', [render('input', null, {
          class: 'c-editor-input',
          type: 'text',
          ref: function ref(i) {
            return inputUrl = i;
          },
          placeholder: '请输入图片url'
        }), render('button', '提交', {
          class: 'c-editor-button',
          on: {
            click: function click() {
              var v = inputUrl.value;
              // check url include http or https, and is \\
              if (/^\/\/|http:\/\/|https:\/\//gi.test(v)) {
                _this2.insert(v);
              }
            }
          }
        })], {
          ref: function ref(i) {
            return urlView = i;
          },
          class: 'c-editor-hide'
        }), render('div', [render('div', '拖拽区域', {
          on: {
            drop: function drop(e) {
              _this2.dropFile(e);
            },
            click: function click(e) {
              e.stopPropagation();
              upload.select();
            }
          },
          class: 'c-editor-upload-area'
        })], {
          ref: function ref(i) {
            return uploadView = i;
          },
          class: 'c-editor-show'
        })], {
          class: 'e-editor-image-view'
        });
      }
    }]);
    return Image;
  }();

  var Video = function () {
    function Video(el, editor) {
      classCallCheck(this, Video);

      this.editor = editor;
      this.el = el;

      this.options = editor.config.options.image;

      this.init();
    }

    createClass(Video, [{
      key: 'init',
      value: function init() {
        var modal = dropModal(this.el, this.View);
      }
    }, {
      key: 'insert',
      value: function insert(url) {
        var template = '<iframe src=\'' + url + '\' frameborder=0 autoplay="false" ></iframe>';

        if (this.options.singleLine) template += '<p><br /></p>';

        this.editor.exec('insertHTML', template);
      }
    }, {
      key: 'Button',
      value: function Button(cb) {
        return render('button', '上传', {
          on: {
            click: function click(e) {
              cb(e);
            }
          }
        });
      }
    }, {
      key: 'View',
      get: function get$$1() {
        var _this = this;

        var status = 0;
        var uploadView = void 0;
        var urlView = void 0;
        var labelUpload = void 0;
        var labelLink = void 0;

        var upload = formDataUpload(this.options.action, {
          change: function change(e) {},

          load: function load(e, res) {
            if (!e) {
              _this.insert(res);
            }
          }
        });

        var inputUrl = '';

        return render('div', [render('div', [render('span', '上传', {
          class: 'c-editor-label c-editor-label-active',

          on: {
            click: function click() {
              if (status) {
                uploadView.classList.remove('c-editor-hide');
                uploadView.classList.add('c-editor-show');
                urlView.classList.remove('c-editor-show');
                urlView.classList.add('c-editor-hide');
                labelLink.classList.remove('c-editor-label-active');
                labelUpload.classList.add('c-editor-label-active');
                status = 0;
              }
            }
          },
          ref: function ref(i) {
            return labelUpload = i;
          }
        }), render('span', null, {
          class: 'c-editor-label-mid'
        }), render('span', '链接', {
          class: 'c-editor-label',
          on: {
            click: function click() {
              if (!status) {
                urlView.classList.remove('c-editor-hide');
                urlView.classList.add('c-editor-show');
                uploadView.classList.remove('c-editor-show');
                uploadView.classList.add('c-editor-hide');
                labelUpload.classList.remove('c-editor-label-active');
                labelLink.classList.add('c-editor-label-active');
                status = 1;
              }
            }
          },
          ref: function ref(i) {
            return labelLink = i;
          }
        })], {
          class: 'c-editor-modal-title'
        }), render('div', [render('input', null, {
          class: 'c-editor-input',
          type: 'text',
          ref: function ref(i) {
            return inputUrl = i;
          },
          placeholder: '请输入视频url'
        }), render('button', '提交', {
          class: 'c-editor-button',
          on: {
            click: function click() {
              var v = inputUrl.value;
              // check url include http or https, and is \\
              if (/^\/\/|http:\/\/|https:\/\//gi.test(v)) {
                _this.insert(v);
              }
            }
          }
        })], {
          ref: function ref(i) {
            return urlView = i;
          },
          class: 'c-editor-hide'
        }), render('div', [render('div', '拖拽或点击上传', {
          on: {
            drop: function drop(e) {
              _this.dropFile(e);
            },
            click: function click(e) {
              e.stopPropagation();
              upload.select();
            }
          },
          class: 'c-editor-upload-area'
        })], {
          ref: function ref(i) {
            return uploadView = i;
          },
          class: 'c-editor-show'
        })], {
          class: 'e-editor-image-view'
        });
      }
    }]);
    return Video;
  }();

  var drag = (function (el, func) {
    var move = function move(e) {
      func(e);
    };
    var end = function end(e) {
      func(e);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', end);
    };
    el.addEventListener('mousedown', function (e) {
      document.onselectstart = function () {
        return false;
      };
      document.ondragstart = function () {
        return false;
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', end);
    });
  });

  function createSlide () {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!option.width) return;

    var _option$direction = option.direction,
        _option$height = option.height,
        height = _option$height === undefined ? 10 : _option$height,
        _option$offset = option.offset,
        offset = _option$offset === undefined ? 2 : _option$offset,
        _option$width = option.width,
        width = _option$width === undefined ? 200 : _option$width,
        _option$percent = option.percent,
        _option$chunkWidth = option.chunkWidth,
        chunkWidth = _option$chunkWidth === undefined ? 4 : _option$chunkWidth,
        _option$change = option.change,
        change = _option$change === undefined ? noop : _option$change;


    var chunk = void 0;

    var el = render('div', [render('div', [], {
      style: {
        width: chunkWidth,
        marginLeft: -chunkWidth / 2,
        height: height + offset * 2,
        left: 0,
        top: 0
      },
      ref: function ref(i) {
        return chunk = i;
      },

      class: 'c-editor-slide-chunk'
    }), render('div', [], {
      class: 'c-editor-slide-container',
      style: {
        width: width,
        height: height
      }
    })], {
      class: 'c-editor-slide',
      style: {
        width: width,
        height: height + 2 * offset,
        padding: offset + 'px 0'
      }
    });

    var setOffset = function setOffset(o) {
      chunk.style.left = o + 'px';
    };

    var onslide = function onslide(e) {
      var _el$getBoundingClient = el.getBoundingClientRect(),
          width = _el$getBoundingClient.width,
          left = _el$getBoundingClient.left,
          height = _el$getBoundingClient.height,
          top = _el$getBoundingClient.top;

      var tmp = e.clientX - left;

      tmp = Math.min(tmp, width);
      tmp = Math.max(0, tmp);

      setOffset(tmp);

      change(tmp / width);
    };

    drag(chunk, onslide);

    return el;
  }

  var Bold$1 = function () {
    function Bold(el, editor) {
      classCallCheck(this, Bold);

      this.el = el;
      this.editor = editor;
      this._cmd = 'bold';
      // this._status = false
      this.init();
    }

    createClass(Bold, [{
      key: 'init',
      value: function init() {
        var modal = dropModal(this.el, this.view);
      }
    }, {
      key: 'hanlderClick',
      value: function hanlderClick() {
        var isEmpty = this.editor.selection.isEmpty();

        if (isEmpty) {
          this.editor.selection.createEmpty();
        }

        this.editor.exec(this._cmd);

        if (isEmpty) {
          // 需要将选取折叠起来
          this.editor.selection.collapseRange();
          this.editor.selection.restoreSelection();
        }

        this._status = this.editor.status(this._cmd);
        this.toggleActive(this._status);
      }
    }, {
      key: 'toggleActive',
      value: function toggleActive(status) {
        this.el.classList[status ? 'add' : 'remove']('c-edit-icon-active');
      }
    }, {
      key: 'destory',
      value: function destory() {
        this._resigter();
      }
    }, {
      key: 'view',
      get: function get$$1() {
        var slide = createSlide({ width: 200 });

        var colorMap = render('div', [render('div', [], {
          class: 'c-colorpicker-white'
        }), render('div', [], {
          class: 'c-colorpicker-black'
        })], {
          class: 'c-colorpicker-wrapper',
          style: {
            backgroundColor: 'green'
          }
        });
        return render('div', [colorMap, slide
        // r('div', [], { style: 'width: 200px;height: 200px;background: #ccc' })
        ]);
      }
    }]);
    return Bold;
  }();

  var optionMap$1 = [{ value: 1, size: 14, inner: 'x-small' }, { value: 2, size: 16, inner: 'small' }, { value: 3, size: 18, inner: 'normal' }, { value: 4, size: 20, inner: 'large' }, { value: 5, size: 22, inner: 'x-large' }, { value: 6, size: 24, inner: 'xx-large' }];

  var DropdownView$1 = function DropdownView() {
    var lis = optionMap$1.map(function (val) {
      return render('font', val.inner, {
        value: val.value,
        style: 'font-size: ' + val.inner
      });
    });
    return render('ul', lis, {
      class: 'c-editor-font-size-wrapper'
    });
  };

  var FontSize = function () {
    function FontSize(el, editor) {
      classCallCheck(this, FontSize);

      this.el = el;
      this.editor = editor;
      this._cmd = 'fontSize';
      // this._status = false
      this.init();
    }

    createClass(FontSize, [{
      key: 'init',
      value: function init() {
        var _this = this;

        var childs = DropdownView$1();
        dropModal(this.el, childs);

        addEvent(childs, 'click', function (e) {
          var target = e.target;
          var value = target.getAttribute('value');
          _this.editor.exec(_this._cmd, +value);
        });
      }
    }]);
    return FontSize;
  }();

  var allJustify = ['Center', 'Left', 'Right', 'Full'];

  var Justify = function () {
    function Justify(el, editor) {
      classCallCheck(this, Justify);

      this.el = el;
      this.id = editor.uuid;
      this.editor = editor;
      this._status = false;
      this.init();
    }

    createClass(Justify, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this._resigter = addEvent(this.el, 'click', function (e) {
          return _this.hanlderClick(e);
        });
      }
    }, {
      key: 'hanlderClick',
      value: function hanlderClick() {
        this.editor.exec(this._cmd);

        var status = this.editor.status(this._cmd);

        this.toggleActive(status);
      }

      /**
       * @params [boolean] status 是否激活
       * @params [boolean] from 是否外部调用
       */

    }, {
      key: 'toggleActive',
      value: function toggleActive(status, from) {
        var _this2 = this;

        if (status === this._status) return;

        if (!from) {
          allJustify.forEach(function (value) {
            var Sub = _this2.editor._toolsCollect['justify' + value];
            if (Sub && Sub !== _this2) Sub.toggleActive(false, true);
          });
        }

        this.el.classList[status ? 'add' : 'remove']('c-edit-icon-active');

        this._status = status;
      }
    }]);
    return Justify;
  }();


  Justify.tmp = {};

  var JustifyLeft = function (_Justify) {
    inherits(JustifyLeft, _Justify);

    function JustifyLeft(el, editor) {
      classCallCheck(this, JustifyLeft);

      var _this = possibleConstructorReturn(this, (JustifyLeft.__proto__ || Object.getPrototypeOf(JustifyLeft)).call(this, el, editor));

      _this._cmd = 'justifyLeft';
      setTimeout(function () {
        _this.toggleActive(true);
      }, 0);
      return _this;
    }

    return JustifyLeft;
  }(Justify);

  var justifyRight = function (_Justify) {
    inherits(justifyRight, _Justify);

    function justifyRight(el, editor) {
      classCallCheck(this, justifyRight);

      var _this = possibleConstructorReturn(this, (justifyRight.__proto__ || Object.getPrototypeOf(justifyRight)).call(this, el, editor));

      _this._cmd = 'justifyRight';
      return _this;
    }

    return justifyRight;
  }(Justify);

  var JustifyCenter = function (_Justify) {
    inherits(JustifyCenter, _Justify);

    function JustifyCenter(el, editor) {
      classCallCheck(this, JustifyCenter);

      var _this = possibleConstructorReturn(this, (JustifyCenter.__proto__ || Object.getPrototypeOf(JustifyCenter)).call(this, el, editor));

      _this._cmd = 'justifyCenter';
      return _this;
    }

    return JustifyCenter;
  }(Justify);

  // export { default as JustifyRight } from './justify/right'
  // export { default as JustifyCenter } from './justify/center'

  var subTools = /*#__PURE__*/Object.freeze({
    bold: Bold,
    italic: Italic,
    image: Image$1,
    video: Video,
    color: Bold$1,
    fontSize: FontSize,
    justifyLeft: JustifyLeft,
    justifyRight: justifyRight,
    justifyCenter: JustifyCenter
  });

  var uuid$2 = 0;

  var Editor = function () {
    function Editor(selector, config$$1) {
      classCallCheck(this, Editor);

      this.selector = selector;
      this.customerConfig = config$$1;
      this.id = ++uuid$2;
      this.init();
    }

    createClass(Editor, [{
      key: 'init',
      value: function init() {
        this.configInit();
        // dom元素初始化
        this.domInit();

        // selection对象初始化
        this.selectionInit();

        // 工具栏初始化
        this.toolsInit();

        // 事件初始化
        this.eventInit();
        // 选区对象

        this.create();
      }
    }, {
      key: 'configInit',
      value: function configInit() {
        var _customerConfig = this.customerConfig,
            tools = _customerConfig.tools,
            options = _customerConfig.options;

        // can render icons array

        this.supporNames = Object.keys(config.tools);

        // tools = default or is not an array, use config's tools options
        if (tools && tools === 'default' || !isPlainObject(tools)) {
          tools = config.tools;
        }

        this.config = Object.assign({}, this.customerConfig, config);
      }
    }, {
      key: 'selectionInit',
      value: function selectionInit() {
        this.selection = new Selection(this);
      }
    }, {
      key: 'domInit',
      value: function domInit() {
        this.container = findEl(this.selector);

        this.editor = document.createElement('div');
        this.editor.classList.add('c-editor-content');

        this.editorWrapper = document.createElement('div');
        this.editorWrapper.classList.add('c-editor-content-wrapper');
        this.editorWrapper.appendChild(this.editor);
        this.container.appendChild(this.editorWrapper);

        setAttr(this.editor, 'contenteditable', true);
      }
    }, {
      key: 'eventInit',
      value: function eventInit() {
        var _this = this;

        addEvent(this.editor, 'blur', function () {
          return _this.blur();
        });
        addEvent(this.editor, 'focus', function () {
          return _this.focus();
        });
        addEvent(this.editor, 'keydown', function (e) {
          return _this.keydown(e);
        });
        this.paste = new Paste(this);
        addEvent(this.editor, 'keyup', function (e) {
          return _this.keyup(e);
        });
      }
    }, {
      key: 'keyup',
      value: function keyup(e) {
        this.selection.saveRange();
      }
    }, {
      key: 'keydown',
      value: function keydown(e) {
        if (e.keyCode === 8) {
          // 保持第一行空白
          if (this.editor.innerHTML === '<p><br></p>') {
            e.preventDefault();
          }
        } else if (e.keyCode === 13) ;
      }
    }, {
      key: 'create',
      value: function create() {
        this.editor.innerHTML = '<p><br></p>';
        var last = this.editor.children[0];
        // 创建选区
        var _range = document.createRange();
        _range.selectNodeContents(last);
        // 折叠选区
        _range.collapse(false);
        this.selection.saveRange(_range);
        this.selection.restoreSelection();
      }
    }, {
      key: 'find',
      value: function find(selector, parent) {
        return findEl(selector, this.editor);
      }
    }, {
      key: 'toolsInit',
      value: function toolsInit() {
        var _this2 = this;

        var tools = this.config.tools;

        var toolbar = document.createElement('div');
        var toolsCollect = {};

        forEach(tools, function (val, key) {
          if (!_this2.supporNames.includes(key)) return;
          var i = document.createElement('i');

          var classNames = typeof val === 'string' ? val.split(' ') : isArray(val) ? val : [];

          classNames.forEach(function (v) {
            return i.classList.add(v);
          });

          var Sub = subTools[key];

          if (Sub) {
            toolsCollect[key] = new Sub(i, _this2);
          }

          toolbar.appendChild(i);
        });

        toolbar.classList.add('c-editor-toolbar-wrapper');

        this.container.insertBefore(toolbar, this.editorWrapper);
        this._toolsCollect = toolsCollect;
      }
    }, {
      key: 'focus',
      value: function focus(e) {}
    }, {
      key: 'blur',
      value: function blur(e) {
        // 失焦时保存当前range对象

        this.selection.saveRange();
      }
    }, {
      key: 'toolCickHandler',
      value: function toolCickHandler(e, cmd, params) {
        this.exec(cmd, params);
      }
    }, {
      key: 'status',
      value: function status(name) {
        return document.queryCommandState(name);
      }
    }, {
      key: 'exec',
      value: function exec(cmd, params) {
        this.selection.restoreSelection();
        document.execCommand(cmd, false, params);

        this.selection.saveRange();

        this.selection.restoreSelection();
      }
    }]);
    return Editor;
  }();

  window.Editor = Editor;

})));
