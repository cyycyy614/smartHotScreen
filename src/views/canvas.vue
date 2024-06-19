<template>
  <!-- <canvas ref="myCanvas" id="myCanvas" height="170" width="250"></canvas> -->
</template>

<script>
import MarkerCanvas from '@/plugins/canvas'
export default {
  name: 'MyCanvas',
  data() {
    return {
      width: 0,
      height: 0,
      cx: {},
    }
  },
  mounted() {
    const marker1 = new MarkerCanvas({
      text: '测试',
      width: 230,
      height: 170,
      value: 22,
      type: 'hot',
    })
    // this.init()
    const canvas = marker1.getCanvas()
    canvas.style.position = 'absolute'
    canvas.style.left = '100px'
    canvas.style.top = '100px'

    const marker2 = new MarkerCanvas({
      text: '测试测试测试',
      width: 200,
      height: 170,
      value: 22,
      type: 'normal',
    })
    const canvas1 = marker2.getCanvas()
    canvas1.style.position = 'absolute'
    canvas1.style.left = '400px'
    canvas1.style.top = '100px'
  },
  methods: {
    init() {
      const canvas = this.$refs.myCanvas
      this.cx = canvas.getContext('2d')
      this.width = canvas.width
      this.height = canvas.height
      this.angle = 0
      this.drawCanvas()
      this.drawLine()
      this.drawText()
    },
    drawCanvas() {
      const cx = this.cx
      cx.clearRect(0, 0, this.width, this.height)

      cx.fillStyle = '#000000'
      cx.fillRect(0, 0, this.width, this.height)
    },
    drawText() {
      const ctx = this.cx
      ctx.font = '16px serif'
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.fillText('Hello world', 80, 35)
      // ctx.direction = 'rtl'
      // ctx.fillText('Hi!', 150, 130)
    },
    drawLine() {
      const ctx = this.cx

      // 画矩形容器
      // ctx.globalCompositeOperation = 'destination-over'
      ctx.beginPath()
      ctx.fillStyle = 'rgba(29,84,9,1)'
      ctx.moveTo(55, 15)
      ctx.lineTo(195, 15)
      ctx.lineTo(195, 45)
      ctx.lineTo(55, 45)
      ctx.closePath()
      ctx.fill()

      // ctx.globalCompositeOperation = 'destination-over'
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      ctx.moveTo(55, 15)
      ctx.lineTo(195, 15)
      ctx.lineTo(195, 45)
      ctx.lineTo(55, 45)
      ctx.closePath()
      ctx.stroke()

      // 画圆点
      ctx.beginPath()
      ctx.arc(50, 150, 3, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(73,142,14,1)'
      ctx.fill()

      // 画竖线
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(73,142,14,1)'
      ctx.moveTo(50, 150)
      ctx.lineTo(50, 50)
      ctx.stroke()

      // 画菱形
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      ctx.fillStyle = 'rgba(73,142,14,1)'
      ctx.moveTo(50, 50)
      ctx.lineTo(30, 30)
      ctx.lineTo(50, 10)
      ctx.lineTo(70, 30)
      ctx.fill()

      // 画菱形白色边框
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      ctx.moveTo(50, 50)
      ctx.lineTo(30, 30)
      ctx.lineTo(50, 10)
      ctx.lineTo(70, 30)
      ctx.lineTo(50, 50)
      ctx.stroke()

      // 画中间的正方形
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      ctx.moveTo(44, 35)
      ctx.lineTo(44, 22)
      ctx.lineTo(55, 22)
      ctx.lineTo(55, 35)
      ctx.closePath()
      ctx.stroke()
    },
    draw() {
      const cx = this.cx
      cx.clearRect(0, 0, this.width, this.height)

      cx.fillStyle = '#eeeeee'
      cx.fillRect(0, 0, this.width, this.height)

      cx.beginPath()
      const radius = 25 + 150 * Math.abs(Math.sin(this.angle))
      cx.arc(225, 225, radius, 0, Math.PI * 2, false)
      cx.closePath()

      this.angle += Math.PI / 64

      cx.fillStyle = '#006699'
      cx.fill()

      requestAnimationFrame(this.draw)
    },
  },
}
</script>

<style lang="scss" scoped></style>
