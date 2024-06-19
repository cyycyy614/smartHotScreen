<template>
  <div class="chart-info">
    <chart-title text="本供暖季能耗" :isCover="true"></chart-title>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8">
        <div class="row">
          <img class="icon-icon" src="@/assets/icon_hot.png" />
          <div class="row-right">
            <div>用热量</div>
            <div class="label hot">
              <CountTo :startVal="0" :endVal="1413423" :duration="1000" />
              GJ
            </div>
          </div>
          <span class="left-top"></span>
          <span class="left-middle"></span>
          <span class="left-bottom"></span>
          <span class="right-top"></span>
          <span class="right-middle"></span>
          <span class="right-bottom"></span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="row">
          <img class="icon-icon" src="@/assets/icon_engery.png" />
          <div class="row-right">
            <div>用电量</div>
            <div class="label engery">
              <CountTo :startVal="0" :endVal="210231" :duration="1000" />
              kWh
            </div>
          </div>
          <span class="left-top"></span>
          <span class="left-middle"></span>
          <span class="left-bottom"></span>
          <span class="right-top"></span>
          <span class="right-middle"></span>
          <span class="right-bottom"></span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="row">
          <img class="icon-icon" src="@/assets/icon_water.png" />
          <div class="row-right">
            <div>补水量</div>
            <div class="label water">
              <CountTo :startVal="0" :endVal="31251" :duration="1000" />
              m³
            </div>
          </div>
          <span class="left-top"></span>
          <span class="left-middle"></span>
          <span class="left-bottom"></span>
          <span class="right-top"></span>
          <span class="right-middle"></span>
          <span class="right-bottom"></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartTitle from './Title.vue'
import CountTo from 'vue-count-to'
export default {
  name: 'ChartInfo',
  data() {
    return {
      config1: {
        number: [1413423],
        content: '{nt}GJ',
        style: {
          fontSize: 18,
          fill: '#f16940',
        },
        formatter: this.formatter,
      },
    }
  },
  components: {
    ChartTitle,
    CountTo,
  },
  methods: {
    formatter(number) {
      const numbers = number.toString().split('').reverse()
      const segs = []

      while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

      return segs.join(',').split('').reverse().join('')
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-info {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  line-height: 22px;
  margin-top: 30px;
  padding: 20px 30px 20px 30px;
  background: rgb(3, 23, 53, 0.5);
  .row {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(0, 134, 249, 0.06);
    padding: 25px 20px;
    // border-left: 1px solid #0086f9;
    // border-right: 1px solid #0086f9;
    .left-top {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 6px;
      top: 0;
      left: 0;
      background: #0086f9;
    }
    .left-middle {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 70px;
      top: 20px;
      left: 0;
      background: #0086f9;
    }
    .left-bottom {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 6px;
      bottom: 0;
      left: 0;
      background: #0086f9;
    }
    .right-top {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 6px;
      top: 6px;
      right: 0;
      background: #0086f9;
    }
    .right-middle {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 70px;
      top: 20px;
      right: 0;
      background: #0086f9;
    }
    .right-bottom {
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 6px;
      bottom: 0;
      right: 0;
      background: #0086f9;
    }
  }
  .icon-icon {
    width: 48px;
    height: 48px;
    animation: myBreath 2s linear infinite;
  }
  .title-cont {
    margin-top: 0;
  }
  @keyframes myBreath {
    0% {
      transform: scale(0.88);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.88);
    }
  }

  .row-right {
    text-align: left;
    margin-left: 10px;
  }
  .label {
    font-size: 18px;
    font-weight: 600;
    color: #f16940;
    line-height: 25px;
    margin-top: 10px;
    display: flex;
    &.engery {
      color: #ffd901;
    }
    &.water {
      color: #02baed;
    }
  }
}
</style>
