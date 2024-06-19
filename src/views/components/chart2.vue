<!-- 室内外温度趋势 -->

<template>
  <div style="width: 100%; height: 205px; margin-top: 20px" v-loading="loading"></div>
</template>

<script>
import { img } from '@/utils/index'
export default {
  data() {
    return {
      loading: false,
      myChartLine: null,
      formData: [],
      nameData: [],
    }
  },
  name: 'Chart2',
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChartLine = this.$echarts.init(this.$el, 'macarons')
      const xData = ['', '16℃', '20℃', '21℃', '22℃', '28℃', '']
      const yData = [null, 0, 5, 20, 5, 0, null]
      const data = [
        {
          coords: xData.map((x, index) => {
            return [x, yData[index]]
          }),
        },
      ]
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
        grid: {
          top: '20%',
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
                type: 'dashed',
                color: 'rgba(255,255,255,0.1)',
              },
            },
            boundaryGap: false,
            data: ['', '16℃', '20℃', '21℃', '22℃', '28℃', ''],
          },
        ],

        yAxis: [
          {
            name: '%',
            type: 'value',
            nameTextStyle: {
              color: '#ffffff',
              align: 'left',
              padding: [0, 0, 0, -30],
            },
            // min: -10,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
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
            name: '室内温度',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: '#F16940',
              },
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: [
                {
                  type: 'max',
                  name: '最大值',
                },
                {
                  type: 'min',
                  name: '最小值',
                },
              ],
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#F16940',
              },
            },
            itemStyle: {
              color: '#F16940',
              borderColor: '#fff',
              borderWidth: 1,
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(241, 105, 64, 0.6)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(14, 15, 21, 0)',
                    },
                  ],
                  false
                ),
                // shadowColor: 'rgba(108,80,243, 0.9)',
                // shadowBlur: 20,
              },
            },
            data: [null, 0, 5, 20, 5, 0, null],
          },
          // 光点
          {
            name: '光点',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            symbolSize: 30,
            polyline: true, // 多线段
            effect: {
              show: true,
              trailLength: 0.2, // 尾迹长度
              period: 4, // 特效动画的时间, 走完全程的时长
              symbolSize: [26, 72],
              symbol: img,
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0,
              },
            },
            data: data,
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      this.myChartLine.setOption(option)
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
  },
}
</script>

<style></style>
