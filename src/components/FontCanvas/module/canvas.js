const S = {
  init: function (el) {
    S.Drawing.init(el)
    S.Drawing.loop(function () {
      S.Shape.render()
    })
  }
}

S.Drawing = (function () {
  let canvas
  let context
  let renderFn
  const requestFrame = window.requestAnimationFrame ||
                         window.webkitRequestAnimationFrame ||
                         window.mozRequestAnimationFrame ||
                         window.oRequestAnimationFrame ||
                         window.msRequestAnimationFrame ||
                         function (callback) {
                           window.setTimeout(callback, 1000 / 60)
                         }

  return {
    init: function (el) {
      canvas = el
      context = canvas.getContext('2d')
      this.adjustCanvas()
      window.addEventListener('resize', function (e) {
        S.Drawing.adjustCanvas()
      })
    },

    loop: function (fn) {
      renderFn = !renderFn ? fn : renderFn
      this.clearFrame()
      renderFn()
      requestFrame.call(window, this.loop.bind(this))
    },

    adjustCanvas: function () {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    },

    clearFrame: function () {
      context.clearRect(0, 0, canvas.width, canvas.height)
    },

    getArea: function () {
      return { w: canvas.width, h: canvas.height }
    },

    drawCircle: function (p, c) {
      context.fillStyle = c.render()
      context.beginPath()
      context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
    }
  }
}())

S.Point = function (args) {
  this.x = args.x
  this.y = args.y
  this.z = args.z
  this.a = args.a
  this.h = args.h
}

S.Color = function (r, g, b, a) {
  this.r = r
  this.g = g
  this.b = b
  this.a = a
}

S.Color.prototype = {
  render: function () {
    return 'rgba(' + this.r + ',' + +this.g + ',' + this.b + ',' + this.a + ')'
  }
}

S.Dot = function (x, y) {
  this.p = new S.Point({
    x: x,
    y: y,
    z: 5,
    a: 1,
    h: 0
  })

  this.e = 0.07
  this.s = true

  this.c = new S.Color(255, 255, 255, this.p.a)

  this.t = this.clone()
  this.q = []
}

S.Dot.prototype = {
  clone: function () {
    return new S.Point({
      x: this.x,
      y: this.y,
      z: this.z,
      a: this.a,
      h: this.h
    })
  },

  _draw: function () {
    this.c.a = this.p.a
    S.Drawing.drawCircle(this.p, this.c)
  },

  _moveTowards: function (n) {
    const details = this.distanceTo(n, true)
    const dx = details[0]
    const dy = details[1]
    const d = details[2]
    const e = this.e * d

    if (this.p.h === -1) {
      this.p.x = n.x
      this.p.y = n.y
      return true
    }

    if (d > 1) {
      this.p.x -= ((dx / d) * e)
      this.p.y -= ((dy / d) * e)
    } else {
      if (this.p.h > 0) {
        this.p.h--
      } else {
        return true
      }
    }

    return false
  },

  _update: function () {
    if (this._moveTowards(this.t)) {
      const p = this.q.shift()

      if (p) {
        this.t.x = p.x || this.p.x
        this.t.y = p.y || this.p.y
        this.t.z = p.z || this.p.z
        this.t.a = p.a || this.p.a
        this.p.h = p.h || 0
      } else {
        if (this.s) {
          this.p.x -= Math.sin(Math.random() * 3.142)
          this.p.y -= Math.sin(Math.random() * 3.142)
        } else {
          this.move(new S.Point({
            x: this.p.x + (Math.random() * 50) - 25,
            y: this.p.y + (Math.random() * 50) - 25
          }))
        }
      }
    }

    let d = this.p.a - this.t.a
    this.p.a = Math.max(0.1, this.p.a - (d * 0.05))
    d = this.p.z - this.t.z
    this.p.z = Math.max(1, this.p.z - (d * 0.05))
  },

  distanceTo: function (n, details) {
    const dx = this.p.x - n.x
    const dy = this.p.y - n.y
    const d = Math.sqrt(dx * dx + dy * dy)

    return details ? [dx, dy, d] : d
  },

  move: function (p, avoidStatic) {
    if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
      this.q.push(p)
    }
  },

  render: function () {
    this._update()
    this._draw()
  }
}

S.ShapeBuilder = (function () {
  const gap = 13
  const shapeCanvas = document.createElement('canvas')
  const shapeContext = shapeCanvas.getContext('2d')
  const fontSize = 500
  const fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif'

  function fit () {
    shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap
    shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap
    shapeContext.fillStyle = 'red'
    shapeContext.textBaseline = 'middle'
    shapeContext.textAlign = 'center'
  }

  function processCanvas () {
    const pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data
    const dots = []
    let x = 0
    let y = 0
    let fx = shapeCanvas.width
    let fy = shapeCanvas.height
    let w = 0
    let h = 0

    for (let p = 0; p < pixels.length; p += (4 * gap)) {
      if (pixels[p + 3] > 0) {
        dots.push(new S.Point({
          x: x,
          y: y
        }))

        w = x > w ? x : w
        h = y > h ? y : h
        fx = x < fx ? x : fx
        fy = y < fy ? y : fy
      }

      x += gap

      if (x >= shapeCanvas.width) {
        x = 0
        y += gap
        p += gap * 4 * shapeCanvas.width
      }
    }

    return { dots: dots, w: w + fx, h: h + fy }
  }

  function setFontSize (s) {
    shapeContext.font = 'bold ' + s + 'px ' + fontFamily
  }

  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  function init () {
    fit()
    window.addEventListener('resize', fit)
  }

  // Init
  init()

  return {
    imageFile: function (url, callback) {
      const image = new Image()
      const a = S.Drawing.getArea()

      image.onload = function () {
        shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height)
        shapeContext.drawImage(this, 0, 0, a.h * 0.6, a.h * 0.6)
        callback(processCanvas())
      }

      image.onerror = function () {
        callback(S.ShapeBuilder.letter('What?'))
      }

      image.src = url
    },

    circle: function (d) {
      const r = Math.max(0, d) / 2
      shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height)
      shapeContext.beginPath()
      shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false)
      shapeContext.fill()
      shapeContext.closePath()

      return processCanvas()
    },

    letter: function (l) {
      let s = 0

      setFontSize(fontSize)
      s = Math.min(fontSize,
        (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * fontSize,
        (shapeCanvas.height / fontSize) * (isNumber(l) ? 1 : 0.45) * fontSize)
      setFontSize(s)

      shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height)
      shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2)

      return processCanvas()
    },

    rectangle: function (w, h) {
      const dots = []
      const width = gap * w
      const height = gap * h

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          dots.push(new S.Point({
            x: x,
            y: y
          }))
        }
      }

      return { dots: dots, w: width, h: height }
    }
  }
}())

S.Shape = (function () {
  const dots = []
  let width = 0
  let height = 0
  let cx = 0
  let cy = 0

  function compensate () {
    const a = S.Drawing.getArea()

    cx = a.w / 2 - width / 2
    cy = a.h / 2 - height / 2
  }

  return {
    shuffleIdle: function () {
      const a = S.Drawing.getArea()

      for (let d = 0; d < dots.length; d++) {
        if (!dots[d].s) {
          dots[d].move({
            x: Math.random() * a.w,
            y: Math.random() * a.h
          })
        }
      }
    },

    switchShape: function (n, fast) {
      let size
      const a = S.Drawing.getArea()

      width = n.w
      height = n.h

      compensate()

      if (n.dots.length > dots.length) {
        size = n.dots.length - dots.length
        for (let d = 1; d <= size; d++) {
          dots.push(new S.Dot(a.w / 2, a.h / 2))
        }
      }

      let d = 0
      let i = 0

      while (n.dots.length > 0) {
        i = Math.floor(Math.random() * n.dots.length)
        dots[d].e = fast ? 0.25 : (dots[d].s ? 0.14 : 0.11)

        if (dots[d].s) {
          dots[d].move(new S.Point({
            z: Math.random() * 20 + 10,
            a: Math.random(),
            h: 18
          }))
        } else {
          dots[d].move(new S.Point({
            z: Math.random() * 5 + 5,
            h: fast ? 18 : 30
          }))
        }

        dots[d].s = true
        dots[d].move(new S.Point({
          x: n.dots[i].x + cx,
          y: n.dots[i].y + cy,
          a: 1,
          z: 5,
          h: 0
        }))

        n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1))
        d++
      }

      for (let j = d; j < dots.length; j++) {
        if (dots[j].s) {
          dots[j].move(new S.Point({
            z: Math.random() * 20 + 10,
            a: Math.random(),
            h: 20
          }))

          dots[j].s = false
          dots[j].e = 0.04
          dots[j].move(new S.Point({
            x: Math.random() * a.w,
            y: Math.random() * a.h,
            a: 0.3, // .4
            z: Math.random() * 4,
            h: 0
          }))
        }
      }
    },

    render: function () {
      for (let d = 0; d < dots.length; d++) {
        dots[d].render()
      }
    }
  }
}())
export default S
