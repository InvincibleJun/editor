(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  /**
   *
   * @param {*} selector 查询器 [string]
   * @param {*} parent 父元素 [htmlelement]
   * @param {*} isArray 是否复数 [boolean]
   */
  var find = function find(selector, parent, isArray) {
    // 参数修正
    if (arguments.length === 2 && typeof arguments[1] === 'boolean') {
      isArray = parent;
      parent = null;
    }
    return (parent || document)[isArray ? 'querySelectorAll' : 'querySelector'](selector);
  };

  var setAttr = function setAttr(ele, key, value) {
    ele.setAttribute(key, value);
  };

  var addEvent = function addEvent(ele, hander, fn) {
    ele.addEventListener(hander, function (e) {
      return fn(e);
    });
  };

  var config = [{
    icon: 'icon-bold',
    cmd: 'bold'
  }, {
    icon: 'icon-italic',
    cmd: 'italic'
  }];

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
        this.container = find(this.selector);
        this.editor = document.createElement('div');
        setAttr(this.editor, 'contenteditable', true);
        this.container.appendChild(this.editor);
      }
    }, {
      key: 'toolsInit',
      value: function toolsInit() {
        var _this = this;

        var toolbar = document.createElement('div');
        config.forEach(function (val, key) {
          var icon = val.icon,
              cmd = val.cmd;

          var i = document.createElement('i');
          i.classList.add('iconfont');
          i.classList.add(icon);
          addEvent(i, 'click', function () {
            _this.exec(cmd);
          });
          toolbar.appendChild(i);
        });
        this.container.appendChild(toolbar);
      }
    }, {
      key: 'exec',
      value: function exec(cmd) {
        document.execCommand(cmd, false);
      }
    }]);
    return Editor;
  }();

  window.Editor = Editor;

})));
