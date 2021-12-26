
var canvas = document.getElementById('bgCanvas'); var flag = true
canvas.width = 1280
canvas.height = 720
var snowParticleImg = new Image(); var bg = new Image()
snowParticleImg.src = '../static/img/particleSmoke.png', bg.src = '../static/img/canvasbg.jpg'
var ctx = canvas.getContext('2d')
var snowParticle = {
  position_x: new Array(10, 30, 50, 180, 210, 250, 300, 350, 400),
  position_y: new Array(),
  speed_y: new Array(10, 10, 5, 10, 5, 6, 7, 8),
  speed_x: new Array(0, 0),
  size: new Array(20, 10, 22, 18, 19, 20, 19, 30),
  init: function () {
    for (var i = 0; i < 200; i++) {
      this.position_y[i] = ~~(Math.random() * 720)
      this.size[i] = ~~(Math.random() * 40 + 5)
      this.position_x[i] = ~~(Math.random() * 1280)
      this.speed_y[i] = ~~(0.3 * this.size[i])
      this.speed_x[i] = ~~(Math.random() * 10 - 5)
    }
  },
  drawAndMove: function () {
    for (var i = 0; i < 200; i++) {
      if (this.position_y[i] > 720 || this.position_y[i] < 0 || this.position_x[i] > 1280 || this.position_y[i] === undefined) {
        this.position_x[i] = ~~(Math.random() * 1280)
        this.position_y[i] = 0
        this.size[i] = ~~(Math.random() * 20 + 2)
        this.speed_y[i] = ~~(0.3 * this.size[i])
        this.speed_x[i] = ~~(Math.random() * 14 - 7)
        if (i % 100 === 0) {
          this.size[i] = ~~(Math.random() * 60 + 35)
          this.speed_y[i] = ~~(Math.random() * 10 + 15)
          this.speed_x[i] = ~~(Math.random() * 30 - 15)
        }
      }
      ctx.drawImage(snowParticleImg, 0, 0, 22, 22, this.position_x[i], this.position_y[i], this.size[i], this.size[i])
      this.position_x[i] += this.speed_x[i]
      this.position_y[i] += this.speed_y[i]
    }
  }

}
snowParticle.init()
if (window.innerWidth > 640) {
  setInterval(main, 30)
  main()
  // var body = document.getElementsByClassName("body-copy");
}

function main () {
  // var body = document.getElementsByClassName("body-copy");
  ctx.drawImage(bg, 0, 0, 1542, 867, 0, 0, 1280, 720)
  snowParticle.drawAndMove()
  // window.requestAnimationFrame(main);
}
