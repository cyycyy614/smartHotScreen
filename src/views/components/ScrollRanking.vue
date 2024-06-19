<template>
  <div class="dv-scroll-ranking-board" :ref="ref">
    <transition-group name="fade" tag="div" class="list">
      <div class="row-item" v-for="(item, i) in rows" :key="item.id">
        <div class="ranking-info">
          <div class="info-names">{{ item.name }}</div>
          <div class="info-min">{{ item.min }}</div>
          <div class="info-progress-div">
            <div class="info-progress-text">{{ item.value }}%</div>
            <div class="info-progress-wrapper">
              <div
                class="info-progress-inner"
                :style="`width: ${200 - (100 - item.value) * 10}px;`"
              ></div>
              <div class="shine"></div>
            </div>
          </div>
          <div class="info-max">{{ item.max }}</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { deepMerge } from '@jiaminghi/charts/lib/util/index'

import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

export default {
  name: 'DvScrollRankingBoard',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      /** */
      ref: 'scroll-ranking-board',

      defaultConfig: {
        /**
         * @description Board data
         * @type {Array<Object>}
         * @default data = []
         */
        data: [],
        /**
         * @description Row num
         * @type {Number}
         * @default rowNum = 5
         */
        rowNum: 5,
        /**
         * @description Scroll wait time
         * @type {Number}
         * @default waitTime = 2000
         */
        waitTime: 2000,
        /**
         * @description Carousel type
         * @type {String}
         * @default carousel = 'single'
         * @example carousel = 'single' | 'page'
         */
        carousel: 'single',
        /**
         * @description Value unit
         * @type {String}
         * @default unit = ''
         * @example unit = 'ton'
         */
        unit: '',
        /**
         * @description Auto sort by value
         * @type {Boolean}
         * @default sort = true
         */
        sort: true,
        /**
         * @description Value formatter
         * @type {Function}
         * @default valueFormatter = null
         */
        valueFormatter: null,
      },

      mergedConfig: null,

      rows: [],

      animationHandler: '',
    }
  },
  watch: {
    config() {
      const { stopAnimation, calcData } = this

      stopAnimation()

      calcData()
    },
  },
  methods: {
    calcData() {
      const { mergeConfig, startAnimation } = this

      mergeConfig()

      // startAnimation()
    },
    mergeConfig() {
      let { config, defaultConfig } = this

      this.mergedConfig = deepMerge(deepClone(defaultConfig, true), config || {})

      this.rows = this.mergedConfig.data || []
    },
    startAnimation() {
      this.animationHandler = setTimeout(() => {
        this.rows = this.rows.concat(this.rows.splice(0, 1))
        this.startAnimation()
      }, this.mergedConfig.waitTime)
    },
    stopAnimation() {
      if (!this.animationHandler) return

      clearTimeout(this.animationHandler)
    },
  },
  mounted() {
    this.calcData()
  },
  destroyed() {
    const { stopAnimation } = this

    stopAnimation()
  },
}
</script>

<style lang="scss" scoped>
$color: #1370fb;

.dv-scroll-ranking-board {
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter {
    transform: translateY(20px);
  }
  .fade-leave-to {
    transform: translateY(-20px);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.6s;
  }
  .fade-leave-active {
    position: absolute;
    right: 0;
  } /*leave-active必须绝对定位移除元素才有过渡效果*/
  .fade-move {
    transition: transform 0.6s;
  } /* Vue过渡提供的元素位移平滑处理*/
  .list {
    width: 100%;
    height: 250px;
    margin-top: 10px;
    position: relative;
    padding: 0;
    overflow: hidden;
  }
  .row-item {
    width: 100%;
    list-style: none;
    margin: 10px 0;
    align-items: center;
    height: 35px;
    overflow: initial;
  }
  .ranking-info {
    align-items: center;
  }
  .info-names {
    margin-left: 10px;
    width: 120px;
    text-align: left;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    opacity: 0.7;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info-min,
  .info-max {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f68328;
    line-height: 20px;
    opacity: 0.7;
  }
  .info-progress-div {
    width: 230px;
    height: 40px;
    margin: 10px;
    display: inline-block;
    position: relative;
    margin-top: 1px;
  }
  .info-progress-wrapper {
    position: relative;
    width: 100%;
    height: 8px;
    background: #0a264f;
    border-radius: 5px;
    overflow: hidden;
    .info-progress-inner {
      position: absolute;
      height: 8px;
      background: linear-gradient(270deg, #0086f9 0%, #16bcd9 100%);
      border-radius: 5px;
      transform: translate(-50%);
      left: 115px;
    }
    .shine {
      position: absolute;
      width: 30px;
      height: 2px;
      left: 0px;
      top: 2px;
      transform: translateX(-100%);
      background: radial-gradient(#28f8ff 5%, transparent 80%);
      animation: shine 3s ease-in-out infinite alternate;
    }
  }
  @keyframes shine {
    80% {
      left: 0;
      transform: translateX(-100%);
    }

    to {
      left: 100%;
      transform: translateX(0);
    }
  }
  .info-progress-text {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f68328;
    line-height: 20px;
    opacity: 1;
  }
}
</style>
