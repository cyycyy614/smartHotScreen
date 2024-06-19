export default class MarkerCanvas {
  constructor(config) {
    const colorList = {
      hot: {
        lineColor: 'rgba(205,81,43,1)',
        borderColor: 'rgba(205,81,43,1)',
      },
      normal: {
        lineColor: 'rgba(73,142,14,1)',
        borderColor: 'rgba(29,84,9,1)',
      },
      cool: {
        lineColor: 'rgba(63,116,239,1)',
        borderColor: 'rgba(63,116,239,1)',
      },
    }
    this.count = 1
    this.config = config
    this.ctx = null
    this.width = config.width
    this.height = config.height
    this.angle = 0
    const colorObj = colorList[config.type]
    this.lineColor = colorObj.lineColor
    this.borderColor = colorObj.borderColor
  }

  getCanvas = () => {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.width = this.config.width
    canvas.height = this.config.height

    this.ctx = canvas.getContext('2d')
    this.drawCanvas()
    this.draw()
    return canvas
  }

  drawCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
  drawText() {
    this.ctx.font = '14px serif'
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(this.config.text + '(' + this.config.value + '℃)', 85, 35)
    // ctx.direction = 'rtl'
    // ctx.fillText('Hi!', 150, 130)
  }

  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  drawCircle() {
    // 画圆点
    this.ctx.beginPath()
    this.ctx.arc(50, 150, 5, 0, 2 * Math.PI)
    this.ctx.fillStyle = this.lineColor
    this.ctx.fill()
  }

  drawHLine() {
    this.ctx.clearRect(0, 0, this.config.width, this.config.height)
    // 画圆点
    this.drawCircle()
    // 画竖线
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.lineColor
    this.ctx.lineWidth = 4
    this.ctx.moveTo(50, 150)
    this.ctx.lineTo(50, 150 - (100 / 30) * (this.count - 2))
    this.ctx.stroke()
    if (this.count < 32) {
      this.count++
      requestAnimationFrame(() => this.drawHLine())
    } else {
      this.drawInfo()
      this.drawText()
    }
  }

  draw() {
    const config = this.config
    this.ctx.clearRect(0, 0, config.width, config.height)
    // 画圆点
    this.drawCircle()
    this.count++

    if (this.count < 3) {
      // this.sleep(100).then(res => {
      //   // 画竖线
      //   this.drawHLine()
      // })
      // 画竖线
      this.drawHLine()
    } else {
      // 画竖线
      this.drawHLine()
    }
  }

  drawInfo() {
    const ctx = this.ctx
    // 画菱形
    ctx.save()
    ctx.beginPath()
    ctx.translate(50, 30)
    ctx.rotate((45 * Math.PI) / 180)
    ctx.translate(-50, -30)
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.fillStyle = this.lineColor
    ctx.roundRect(30, 10, 40, 40, [5, 5, 5, 5])
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // 画菱形白色边框
    ctx.save()
    ctx.beginPath()
    ctx.translate(50, 30)
    ctx.rotate((45 * Math.PI) / 180)
    ctx.translate(-50, -30)
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.roundRect(30, 10, 40, 40, [5, 5, 5, 5])
    ctx.stroke()
    ctx.restore()

    // 画中间的正方形
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.roundRect(40, 20, 20, 20, 1)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()

    ctx.save()
    // 画矩形容器
    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()
    ctx.fillStyle = this.borderColor
    ctx.roundRect(55, 15, this.config.width - 60, 30, [0, 5, 5, 0])
    ctx.closePath()
    ctx.fill()

    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.lineWidth = 1
    ctx.roundRect(55, 15, this.config.width - 60, 30, [0, 5, 5, 0])
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}
