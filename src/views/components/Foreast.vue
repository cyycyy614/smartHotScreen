<!-- 负荷预测 -->

<template>
  <div id="chart" style="width: 100%; height: 205px; margin-top: 20px" v-loading="loading"></div>
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
  name: 'Foreast',
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChartLine = this.$echarts.init(this.$el, 'macarons')
      const xData = ['1.20', '1.21', '1.22', '1.23', '1.24', '1.25', '1.26']
      const y2Data = [16, 20, 23, 30, 27, null, null]
      const y2DataDashed = [null, null, null, null, null, null, null]
      const y3Data = [-4.5, -4.6, 0.5, 2.4, -5, null, null]
      const y3DataDashed = [null, null, null, null, -5, 3, 5]
      const y1Data = [17, 22, 24, 27, 31, null, null]
      const y1DataDashed = [null, null, null, null, 31, 28, 32]
      const dashedList = [y3DataDashed, y2DataDashed, y1DataDashed]

      const data = [
        {
          coords: xData.map((x, index) => {
            return [x, y2Data[index]]
          }),
        },
        // {
        //   coords: xData.map((x, index) => {
        //     return [x, [-4.5, -4.6, 0.5, 2.4, -5, 3, 5][index]]
        //   }),
        // },
        {
          coords: xData.map((x, index) => {
            return [x, [17, 22, 24, 27, 31, 28, 32][index]]
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
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '15%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
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
            data: ['1.20', '1.21', '1.22', '1.23', '1.24', '1.25', '1.26'],
          },
        ],

        yAxis: [
          {
            name: 'W/m²',
            type: 'value',
            nameTextStyle: {
              color: '#ffffff',
              align: 'left',
              padding: [0, 0, 0, -38],
            },
            // min: -10,
            max: 50,
            // splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
              },
            },
            axisLine: {
              show: true,
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
          {
            name: '℃',
            type: 'value',
            nameTextStyle: {
              color: '#ffffff',
              align: 'right',
              padding: [0, -35, 0, 0],
            },
            min: -10,
            max: 25,
            splitNumber: 4,
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
              },
            },
            axisLine: {
              show: true,
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
            yAxisIndex: 1,
            name: '室外温度',
            type: 'line',
            smooth: true, //是否平滑
            symbol: 'none',
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#FF9B01',
              },
            },
            itemStyle: {
              color: '#FF9B01',
              borderColor: '#fff',
              borderWidth: 1,
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              origin: 'start',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 155, 1, 0.6)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 0, 0, 0)',
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: y3Data,
          },
          {
            yAxisIndex: 0,
            name: '预测负荷',
            type: 'line',
            smooth: true, //是否平滑
            symbol: 'none',
            symbolSize: 6,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#0086F9',
              },
            },
            itemStyle: {
              color: '#0086F9',
              borderColor: '#fff',
              borderWidth: 1,
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              origin: 'start',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 134, 249, 0.6)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 0, 0, 0)',
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: y2Data,
          },
          {
            yAxisIndex: 0,
            name: '实际负荷',
            type: 'line',
            smooth: true, //是否平滑
            symbol: 'none',
            symbolSize: 6,
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
            tooltip: {
              show: false,
            },
            areaStyle: {
              origin: 'start',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(22, 188, 217, 0.6)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 0, 0, 0)',
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: y1Data,
          },
          // 光点
          {
            name: '',
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

      option.series.forEach((series, index) => {
        let dashedSeries = JSON.parse(JSON.stringify(series))
        dashedSeries.data = dashedList[index]
        dashedSeries.lineStyle = {
          type: 'dashed',
        }
        option.series.push(dashedSeries)
      })
      console.log(option)
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
