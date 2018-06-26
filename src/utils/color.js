const hsv2hsl = function(hue, sat, val) {
  return [
    hue,
    (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0,
    hue / 2
  ]
}

const rgb2hsv = function(r, g, b) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, v: v * 100 }
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
const isOnePointZero = function(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}

const isPercentage = function(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}

// Take input from [0, n] and return it as [0, 1]
const bound01 = function(value, max) {
  if (isOnePointZero(value)) value = '100%'

  const processPercent = isPercentage(value)
  value = Math.min(max, Math.max(0, parseFloat(value)))

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(value * max, 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(value - max) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (value % max) / parseFloat(max)
}

const hsl2hsv = function(hue, sat, light) {
  sat = sat / 100
  light = light / 100
  let smin = sat
  const lmin = Math.max(light, 0.01)
  let sv
  let v

  light *= 2
  sat *= light <= 1 ? light : 2 - light
  smin *= lmin <= 1 ? lmin : 2 - lmin
  v = (light + sat) / 2
  sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat)

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  }
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsv2rgb = function(h, s, v) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

const hexToRgb = function(s) {
  if (s.length === 3) {
    s = s
      .split('')
      .map(val => val.repeat(2))
      .join('')
  }
  let [r, g, b] = s.split(/([a-fA-F0-9]{2})/).filter(v => v)
  return {
    r: parseInt('0x' + r),
    g: parseInt('0x' + g),
    b: parseInt('0x' + b)
  }
}

export default class Color {
  constructor({ showAlpha }) {
    // H 色调
    this._hue = 0
    // S 饱和度
    this._saturation = 100
    // L 亮度
    this._value = 100
    // A 透明度
    this._alpha = 100

    //
    this._showAlpha = showAlpha
  }

  init(value) {
    var checkRgbOrRgba = /^[rR][gG][Bb][Aa]?[\(](2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0?\.\d{1,2}|1|0)?[\)]{1}?$/
    var checkHex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/

    let matchRgb = value.match(checkRgbOrRgba)

    if (matchRgb) {
      this.setHsvAndAlpha(matchRgb[1], matchRgb[2], matchRgb[3], matchRgb[4])
      return
    }

    let matchHex = value.match(checkHex)
    if (matchHex) {
      let { r, g, b } = hexToRgb(matchHex[1])
      this.setHsvAndAlpha(r, g, b)
      return
    }
  }

  setHsvAndAlpha(r, g, b, a) {
    // debugger
    if (this._showAlpha && a) {
      this.set('alpha', (a * 100).toFixed(0))
    }

    let { h, s, v } = rgb2hsv(r, g, b)

    this.set({
      hue: h,
      value: v,
      saturation: s
    })
  }

  set(key, value) {
    if (arguments.length === 1) {
      for (let i in arguments[0]) {
        this.set(i, arguments[0][i])
      }
    } else {
      this['_' + key] = value
    }
  }

  get(h, s, v) {
    h = h || this._hue
    s = s || this._saturation
    v = v || this._value
    let { r, g, b } = hsv2rgb(h, s, v)
    let a = this._alpha / 100
    return this._showAlpha ? { r, g, b, a } : { r, g, b }
  }

  getRgbString(h, s, v) {
    let { r, g, b, a } = this.get(h, s, v)
    return a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
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
}
