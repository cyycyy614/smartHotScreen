<template>
  <g>
    <template v-for="(point, i) in points">
      <rect
        :key="i"
        :fill="mergedColor[0]"
        :x="point[0] - halfPointSideLength"
        :y="point[1] - halfPointSideLength"
        :width="pointSideLength"
        :height="pointSideLength"
      >
        <animate
          v-if="Math.random() > 0.6"
          attributeName="fill"
          :values="`${mergedColor.join(';')}`"
          :dur="Math.random() + 1 + 's'"
          :begin="Math.random() * 2"
          repeatCount="indefinite"
        />
      </rect>
    </template>
  </g>
</template>

<script>
import { deepMerge } from '@jiaminghi/charts/lib/util/index'

import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

export default {
  name: 'DvDecoration3',
  props: {
    color: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const pointSideLength = 4

    return {
      ref: 'decoration-3',

      svgWH: [150, 30],

      svgScale: [1, 1],

      rowNum: 1,
      rowPoints: 10,

      pointSideLength,
      halfPointSideLength: pointSideLength / 2,

      points: [],

      defaultColor: ['#02baed', 'transparent'],

      mergedColor: [],
    }
  },
  watch: {
    color() {
      const { mergeColor } = this

      mergeColor()
    },
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { calcSVGData } = this

      calcSVGData()
    },
    calcSVGData() {
      const { calcPointsPosition, calcScale } = this

      calcPointsPosition()

      calcScale()
    },
    calcPointsPosition() {
      const { svgWH, rowNum, rowPoints } = this

      const [w, h] = svgWH

      const horizontalGap = w / (rowPoints + 1)
      const verticalGap = h / (rowNum + 1)

      let points = new Array(rowNum)
        .fill(0)
        .map((foo, i) =>
          new Array(rowPoints)
            .fill(0)
            .map((foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)])
        )

      this.points = points.reduce((all, item) => [...all, ...item], [])
    },
    calcScale() {
      const { width, height, svgWH } = this

      const [w, h] = svgWH

      this.svgScale = [width / w, height / h]
    },
    onResize() {
      const { calcSVGData } = this

      calcSVGData()
    },
    mergeColor() {
      const { color, defaultColor } = this

      this.mergedColor = deepMerge(deepClone(defaultColor, true), color || [])
    },
  },
  mounted() {
    const { mergeColor } = this

    mergeColor()
    this.calcSVGData()
  },
}
</script>

<style lang="scss" scoped>
.dv-decoration-3 {
  width: 100%;
  height: 100%;

  svg {
    transform-origin: left top;
  }
}
</style>
