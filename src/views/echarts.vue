<template>
  <div class="graph-chart-wrap">
    <div class="graph-chart" ref="graph"></div>
    <img ref="image" style="width: 10px" v-show="false" src="@/assets/centerMap.png" alt />
  </div>
</template>

<script>
import * as echartMapJSON from '@/json/china.json'

export default {
  data() {
    return {
      indicateVal: '',
      list: [],
    }
  },
  methods: {
    createChart() {
      const GeoCoordMap = {
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        重庆: [108.384366, 30.439702],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        广东: [113.12244, 23.009505],
        上海: [121.4648, 31.2891],
      }
      const data = [
        { name: '北京', value: 199 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 123 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 109 },
        { name: '福建', value: 116 },
        { name: '江西', value: 91 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 125 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 56 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 180 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 },
      ]
      const colorList = ['#5776DE', '#709EED', '#6434D5', '#E26395', '#E8A057', '#6434D5']

      const convertData = data => {
        let res = []
        for (let i = 0; i < data.length; i++) {
          const geoCoord = GeoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            })
          }
        }
        return res
      }

      const dom = this.$refs['image']

      let options = {
        title: {
          top: 20,
          // text: '“会员活跃度” - 山东省',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: '#fff',
          className: 'echarts-tooltip echarts-tooltip-dark echarts-tooltip-user',
          borderColor: '#e6e6e6',
          padding: 4,
          triggerOn: 'click',
        },
        geo: {
          map: 'china',
          show: true,
          roam: true,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          type: 'map',
          geoIndex: '1',
          zoom: 1.2,
          layoutSize: '80%',
          layoutCenter: ['65%', '50%'],
          itemStyle: {
            normal: {
              areaColor: {
                image: dom,
                repeat: 'no-repeat',
              },
              borderColor: 'rgba(0,0,0,0.2)',
            },
            emphasis: {
              areaColor: '#69a5ff',
              color: '#fff',
            },
            label: {
              show: false,
            },
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 100,
          },
        },
        series: [
          {
            symbolSize: 5,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#fff',
              },
            },
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: [8, 8],
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                },
              },
            },
            data: convertData(data),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            zlevel: 1,
            tooltip: {
              formatter: function (params) {
                return `<div style="width: aoto;text-align:center;line-height:28px; height: auto;color:#fff;font-size: 10px; padding:5px;margin: 0;background:${
                  colorList[params.dataIndex]
                };border-radius:10px">
              <p style="line-height:20px;padding:0;margin:0">${params.name}工厂线</p>
              <p style="line-height:20px;padding:0;margin:0">今日实时生产总数</p>
              <p style="line-height:20px;padding:0;margin:0">${params.value[2]}</p>
              </div>`
              },
              position: 'top',
              backgroundColor: '#fff',
            },
          },
        ],
      }

      const echarts = this.$echarts
      console.log('echartMapJSON', echartMapJSON)
      const graphChart = this.$echarts.init(this.$refs.graph)
      echarts.registerMap('china', echartMapJSON)
      graphChart.setOption(options)
      let len = -1
      // setInterval(() => {
      //   const dataLen = colorList.length
      //   len = (len + 1) % dataLen
      //   graphChart.dispatchAction({
      //     type: 'hideTip',
      //   })
      //   graphChart.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 1,
      //     dataIndex: len,
      //   })
      // }, 2000)
    },
  },
  mounted() {
    this.createChart()
  },
}
</script>

<style lang="scss">
#app {
  background: #ffffff;
}
</style>
<style lang="scss" scoped>
.container {
  padding: 200px 100px 100px 100px;
  font-size: 20px;
  color: #fff;
  .info {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.graph-chart {
  width: 100%;
  height: 100vh;
}
</style>
