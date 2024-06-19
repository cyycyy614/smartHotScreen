<template>
  <div class="container">
    <el-button @click="compute">计算奋斗指数</el-button>
    <div class="info">奋斗指数： {{ indicateVal }}</div>
    <div class="list">
      <div class="row" v-for="(row, index) in list">
        <span>{{ row.date }}:</span>
        <span>{{ row.val }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from '@/json/data.js'

export default {
  data() {
    return {
      indicateVal: '',
      list: [],
    }
  },
  methods: {
    compute() {
      if (!list || list.length === 0) {
        return
      }

      let indicate = 0
      // 便利list
      list.map(x => {
        if (x.K_RQ.split('-')[1] == 11) {
          const K_SHIFT_NAME = x.K_SHIFT_NAME
          const period = x.K_QJSJ * 60
          // 计算今天的总数 -9
          const todayMinute = this.diff(x.K_SK3, x.K_SK4)
          let realMinute = 0
          switch (K_SHIFT_NAME) {
            case '长白班':
              if (x.K_QJSJ > 0) {
                realMinute -= x.K_QJSJ * 60
              } else {
                realMinute += todayMinute - 540 - period
              }
              break
            case '周六排班':
              realMinute += todayMinute - 60 - period
              break
            case '休息':
              if (todayMinute > 0) {
                realMinute += todayMinute - 60
              }
              break

            default:
              break
          }
          indicate += realMinute
          this.list.push({
            date: x.K_RQ,
            val: realMinute,
          })
        }
      })
      this.indicateVal = (indicate / 60).toFixed(2)
    },
    diff(time1, time2) {
      if (!time1 || !time2) {
        return 0
      }
      const startHour = +time1.split(':')[0]
      const startMinute = +time1.split(':')[1]
      const endHour = +time2.split(':')[0]
      const endMinute = +time2.split(':')[1]
      return (endHour - startHour) * 60 + (endMinute - startMinute)
    },
  },
}
</script>

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
</style>
