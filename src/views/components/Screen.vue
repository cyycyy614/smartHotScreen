<template>
  <div class="screen-wrapper">
    <div class="left" :class="show ? '' : 'hide'">
      <div class="title">
        <span class="logo-info"><img class="logo" src="@/assets/logo_qiancheng.png" /></span>
        <span class="nowdate">2023-01-26 10:47</span>
      </div>

      <div class="left-chart1">
        <chart-title text="室内外温度趋势"></chart-title>
        <chart1></chart1>
      </div>

      <div class="left-chart1">
        <chart-title text="实时室温：2023.01.26 10:47"></chart-title>
        <div class="time-info">
          <!-- <img class="icon-time" src="@/assets/icon_1.png" />
          <span class="time-info-label">最高温度:28℃</span>
          <img class="icon-time" src="@/assets/icon_2.png" />
          <span class="time-info-label">最低温度:16℃</span> -->
          <img class="icon-time" src="@/assets/icon_3.png" />
          <span class="time-info-label">平均温度:21℃</span>
          <img class="icon-time" src="@/assets/icon_4.png" />
          <span class="time-info-label">室温达标率:96.02%</span>
        </div>
        <chart2></chart2>
      </div>

      <div class="left-chart3">
        <chart-title text="室温达标率前五换热站"></chart-title>
        <scroll-ranking :config="rateList" style="width: 100%; height: 250px"></scroll-ranking>
      </div>
    </div>
    <div class="middle" :class="show ? '' : 'hide'">
      <info></info>
    </div>
    <div class="right" :class="show ? '' : 'hide'">
      <div class="title">
        <span class="weather-info">
          <img class="icon-weather" src="@/assets/sunshine.png" />
          <span class="seperate">晴</span>
          <span>-4～2℃</span>
        </span>
        <span class="weather-wind">西北风三级</span>
      </div>

      <div class="right-chart1">
        <chart-title text="负荷预测"></chart-title>
        <foreast></foreast>
      </div>

      <div class="right-chart2">
        <chart-title text="单位热功率"></chart-title>
        <chart4></chart4>
      </div>

      <div class="right-chart3">
        <chart-title text="单位热功率前五换热站"></chart-title>
        <scroll-progress :config="powerList" style="width: 100%; height: 250px"></scroll-progress>
      </div>
    </div>

    <div class="btns" @click="show = !show">
      <template v-if="show">
        <img class="btn_collpse" :src="CollpseIcon" />
        <div class="btn_txt">隐藏</div>
      </template>
      <template v-else>
        <img class="btn_collpse" :src="ExpandIcon" />
        <div class="btn_txt">显示</div>
      </template>
    </div>
  </div>
</template>

<script>
import ChartTitle from './Title.vue'
import Chart1 from './chart1.vue'
import Chart2 from './chart2.vue'
import Chart4 from './chart4.vue'
import ScrollRanking from './ScrollRanking.vue'
import ScrollProgress from './ScrollProgress.vue'
import Info from './Info.vue'
import Foreast from './Foreast.vue'

import CollpseIcon from '@/assets/icon_collopse.png'
import ExpandIcon from '@/assets/icon_expand.png'

export default {
  components: {
    ChartTitle,
    Chart1,
    Chart2,
    ScrollRanking,
    ScrollProgress,
    Info,
    Foreast,
    Chart4,
  },
  data() {
    return {
      show: true,
      CollpseIcon,
      ExpandIcon,
      rateList: {},
      powerList: {},
    }
  },
  created() {
    this.rateList = {
      data: [
        {
          id: 1,
          name: '鲁商蓝岸换热站',
          min: '18℃',
          max: '28℃',
          value: 98.1,
        },
        {
          id: 2,
          name: '王家下河换热站',
          min: '16℃',
          max: '26℃',
          value: 97.92,
        },
        {
          id: 3,
          name: '聚博苑换热站',
          min: '18℃',
          max: '28℃',
          value: 96.34,
        },
        {
          id: 4,
          name: '春和景明换热站',
          min: '18℃',
          max: '26℃',
          value: 95.55,
        },
        {
          id: 5,
          name: '玉祥苑换热站',
          min: '17℃',
          max: '27℃',
          value: 94.3,
        },
      ],
    }
    this.powerList = {
      data: [
        {
          id: 1,
          name: '鲁商蓝岸换热站',
          progress: 22.5,
          value: '23.3W/m²',
        },
        {
          id: 2,
          name: '王家下河换热站',
          progress: 25.5,
          value: '23.5W/m²',
        },
        {
          id: 3,
          name: '聚博苑换热站',
          progress: 32.5,
          value: '23.9W/m²',
        },
        {
          id: 4,
          name: '春和景明换热站',
          progress: 42.5,
          value: '24.2W/m²',
        },
        {
          id: 5,
          name: '玉祥苑换热站',
          progress: 52.5,
          value: '24.8W/m²',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.screen-wrapper {
  padding: 50px 70px;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
}
.left {
  width: 460px;
  padding: 0 10px;
  background: rgb(3, 23, 53, 0.5);
  .left-chart1 {
    animation-fill-mode: both;
    animation: fadeInLeft;
    animation-duration: 1s;
  }
  .left-chart2 {
    animation-fill-mode: both;
    animation: fadeInLeft;
    animation-duration: 0.75s;
    animation-delay: 0.25s;
  }
  .left-chart3 {
    animation-fill-mode: both;
    animation: fadeInLeftNew;
    animation-duration: 0.8s;
  }

  &.hide {
    opacity: 0;
    transition: opacity 0.5s ease;
    .left-chart1 {
      animation-fill-mode: both;
      animation: fadeOutLeft;
      animation-duration: 1s;
    }
    .left-chart2 {
      animation-fill-mode: both;
      animation: fadeOutLeft;
      animation-duration: 0.75s;
      animation-delay: 0.25s;
    }
    .left-chart3 {
      animation-fill-mode: both;
      animation: fadeOutLeft;
      animation-duration: 0.8s;
    }
  }
}

@-webkit-keyframes fadeInLeftNew {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  50% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

@keyframes fadeInLeftNew {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  50% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

@-webkit-keyframes fadeInRightNew {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  50% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

@keyframes fadeInRightNew {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  50% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
.middle {
  width: 680px;
  margin: 30px 70px;
  &.hide {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
}
.right {
  width: 460px;
  padding: 0 10px;
  background: rgb(3, 23, 53, 0.5);
  .right-chart1 {
    animation: fadeInRight;
    animation-duration: 1s;
  }
  .right-chart2 {
    animation: fadeInRightNew;
    animation-duration: 0.75s;
  }
  .right-chart3 {
    animation: fadeInRightNew;
    animation-duration: 0.8s;
  }

  &.hide {
    opacity: 0;
    transition: opacity 0.5s ease;
    .right-chart1 {
      animation: fadeOutRight;
      animation-duration: 1s;
    }
    .right-chart2 {
      animation: fadeOutRight;
      animation-duration: 0.75s;
    }
    .right-chart3 {
      animation: fadeOutRight;
      animation-duration: 0.8s;
    }
  }
}
.title {
  position: relative;
  width: 406px;
  height: 28px;
  // background: rgba(0, 134, 249, 0.07);
  display: flex;
  padding: 0 20px;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -10px;
    top: 11px;
    width: 3px;
    height: 6px;
    background: #22c0e3;
  }
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -10px;
    top: 11px;
    width: 3px;
    height: 6px;
    background: #22c0e3;
  }

  .logo-info {
    flex: 4;
    margin-left: 20px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      height: 14px;
      border: 1px solid #0086f9;
    }
  }
  .logo {
    width: 56px;
    height: 20px;
    vertical-align: middle;
  }
  .nowdate {
    flex: 5;
    margin-right: 20px;
  }
  .weather-info {
    flex: 4;
    margin-left: 20px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      height: 14px;
      border: 1px solid #0086f9;
    }
    .icon-weather {
      vertical-align: middle;
    }
    .seperate {
      margin-left: 10px;
      margin-right: 20px;
      vertical-align: middle;
    }
  }
  .weather-wind {
    flex: 5;
    margin-right: 20px;
  }
}

.time-info {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
  opacity: 0.8;
  flex-wrap: nowrap;
  .icon-time {
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: 4px;
  }
  .time-info-label {
    vertical-align: middle;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    margin-right: 10px;
    white-space: nowrap;
  }
}

.btns {
  position: fixed;
  width: 32px;
  height: 42px;
  left: 45.5%;
  padding: 10px;
  bottom: 0px;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.2);
}
.btn_collpse {
  position: fixed;
  width: 32px;
  height: 32px;
  bottom: 25px;
  left: 46%;
}
.btn_txt {
  position: fixed;
  width: 32px;
  height: 48px;
  bottom: -25px;
  left: 46%;
  color: #ffffff;
  font-size: 14px;
}
</style>
