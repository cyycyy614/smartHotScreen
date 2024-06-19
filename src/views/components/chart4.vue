<!-- 单位热功率 -->

<template>
  <div
    class="chart4"
    style="width: 100%; height: 225px; margin-top: 20px; overflow: hidden"
    v-loading="loading"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
      loading: false,
      myChartLine: null,
      formData: [],
      nameData: [],
    }
  },
  name: 'Chart4',
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChartLine = this.$echarts.init(this.$el, 'macarons')
      let data = [null, 42, 46, 38, null]
      let animateData = [null, 42, 46, 38, null]
      // 指定图表的配置项和数据

      var option = {
        backgroundColor: 'transparent',
        title: {
          text: '',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 20,
          },
          top: '5%',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          type: 'scroll',
          itemWidth: 11,
          itemHeight: 8,
          itemGap: 10,
          icon: 'roundRect',
          textStyle: {
            fontSize: 14,
            color: '#FFFFFF',
          },
        },
        grid: {
          top: '15%',
          left: '10%',
          right: '3%',
          bottom: '15%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
              symbol: ['none', 'triangle'],
              symbolOffset: [25, 10],
              symbolSize: [8, 8],
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
                width: 1,
                // 利用阴影进行延长
                shadowOffsetX: 10, // x轴阴影偏移
                shadowColor: 'rgba(255,255,255,0.1)',
              },
            },
            axisLabel: {
              color: '#fff',
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
              },
            },
            boundaryGap: false,
            data: ['', '2020～2021', '2021～2022', '2022～2023', ''],
          },
        ],

        yAxis: [
          {
            name: 'W/m²',
            type: 'value',
            nameTextStyle: {
              color: '#ffffff',
              align: 'left',
              padding: [0, 0, 0, -40],
            },
            // min: -10,
            max: 50,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed', // 虚线
                color: 'rgba(255,255,255,0.1)',
              },
            },
            axisLine: {
              show: true,
              symbol: ['none', 'triangle'],
              symbolOffset: [25, 10],
              symbolSize: [8, 8],
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
                width: 1,
                // 利用阴影进行延长
                shadowOffsetX: 10, // x轴阴影偏移
                shadowColor: 'rgba(255,255,255,0.1)',
              },
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                color: '#ffffff',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '单位热功率',
            type: 'bar',
            barWidth: 14,
            itemStyle: {
              color: '#F16940',
            },
            animation: true,
            animationDuration: 2000,
            data: [null, 42, 46, 38, null],
          },
          {
            name: '动画柱子',
            type: 'bar',
            barGap: '-94%',
            barWidth: 12,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(241, 105, 64, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                ]),
              },
            },
            data: animateData,
            z: 10,
            zlevel: 0,
          },
          {
            name: '单位热功率',
            type: 'line',
            animation: true,
            animationDuration: 2000,
            smooth: false, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: '#16BCD9',
              },
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#16BCD9',
              },
            },
            itemStyle: {
              color: '#16BCD9',
              borderColor: '#fff',
              borderWidth: 1,
            },
            data: [null, 42, 46, 38, null],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      this.myChartLine.setOption(option)

      this.timeout = setInterval(() => {
        animateData = data.map(x => {
          let value = ''
          if (x != null) {
            value = Math.round(Math.random() * x)
          } else {
            value = null
          }
          return value
        })
        option.series[1].data = animateData
        this.myChartLine.setOption(option)
      }, 500)
    },
  },
  mounted() {
    //图的大小自适应
    window.addEventListener('resize', () => {
      if (this.myChartLine) {
        this.myChartLine.resize()
      }
    })
    this.myEcharts()
  },
  beforeDestroy() {
    //实例销毁之前调用
    if (!this.myChartLine) {
      return
    }
    this.myChartLine.dispose()
    this.myChartLine = null
    clearInterval(this.timeout)
  },
}
</script>

<style lang="scss" scoped>
.chart4 {
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -160px;
    width: 80px;
    height: 200px;
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-35deg);
    animation: rolled 4s 0.2s ease both infinite;
    overflow: hidden;
  }
}
.rolled {
  position: absolute;
  top: 0;
  left: -160px;
  width: 80px;
  height: 200px;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-35deg);
  animation: rolled 4s 0.2s ease both infinite;
  overflow: hidden;
}
@keyframes rolled {
  65% {
    left: -150px;
  }
  100% {
    left: 1050px;
  }
}
</style>
