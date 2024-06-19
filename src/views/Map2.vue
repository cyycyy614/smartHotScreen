<!-- https://mapv.baidu.com/gl/examples/editor.html#effects-bloom.html -->

<template>
  <div id="container" class="container">
    <div id="map" class="map"></div>
    <div id="home" class="home">
      <div id="home-wrapper" class="home-wrapper">
        <border></border>
        <div id="screen">
          <screen></screen>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="home">
    <div id="map" class="map"></div>
    <div id="screen"></div>
  </div> -->
</template>

<script>
import { lazyBMapApiLoaderInstance } from 'vue-bmap-gl'
import { nightStyle, darkStyle, blueStyle } from '@/plugins/common'
import Border from './components/border.vue'
import Screen from './components/Screen.vue'
import { geoJson } from '../json/chongqing.js'
// import { geoQDJson } from '../json/huangdao2.js'
import { pathList } from '../json/border.js'
import MarkerIcon from '@/assets/icon_hot.png'
import CollpseIcon from '@/assets/icon_collopse.png'
import ExpandIcon from '@/assets/icon_expand.png'
import MarkerCanvas from '@/plugins/canvas'

export default {
  data() {
    return {
      MarkerIcon,
      CollpseIcon,
      ExpandIcon,
      position_NKYYGS: {
        Name: '四川省农业科学院',
        address: '成都市锦江区静居寺路20号',
        phoneNumber: '(028)84504011',
        bdLNG: 116.297611,
        bdLAT: 40.047363,
      },
      map: '',
      markerPoints: [
        [106.5477548123294, 29.55962846425763, '桂花园新村', 20],
        [106.55806319035473, 29.557548495327236, '紫云阁', 15],
        [106.56157280541494, 29.560343245886887, '信诚苑', 14],
        [106.5624199144208, 29.565282492653022, '书香苑', 27],
        [106.56734650614321, 29.56845759492369, '巴蜀剑桥', 29],
        [106.57007786974641, 29.578064843761332, '珠江太阳城', 21],
        [106.55264680193054, 29.57828586052282, '富强社区', 23],
        [106.53669628404171, 29.561991236310714, '金沙水岸', 28],
      ],
    }
  },
  components: {
    Border,
    Screen,
  },
  methods: {
    baidu() {
      // lazyBMapApiLoaderInstance.load().then(this.initMap())
      this.initMap()
    },
    // 3d地图
    initMap() {
      const map = new BMapGL.Map('map', {
        backgroundColor: [9, 34, 78, 1000],
        skyColors: [
          // 地面颜色
          'rgba(226, 237, 248, 0)',
          // 天空颜色
          'rgba(186, 211, 252, 1)',
        ],
      }) // 创建Map实例
      map.setDisplayOptions({
        building: false,
      })
      // map.centerAndZoom(new BMapGL.Point(120.1723151201308, 35.95084641828497), 16)
      map.centerAndZoom(new BMapGL.Point(106.53669628404171, 29.561991236310714), 16)
      map.addControl(
        new BMapGL.NavigationControl3D({
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          offset: new BMapGL.Size(880, 0),
        })
      )
      map.enableScrollWheelZoom(true)
      // map.setHeading(-45)
      map.setTilt(83)
      map.setMapStyleV2({ styleJson: blueStyle })

      this.map = map

      // map.addEventListener('zoomend', e => {
      //   console.log('zoom end', e)
      //   map.setTilt(83)
      // })
      // 青岛市黄岛区
      // this.locationQingDao()
      // 示例，重庆市渝中区
      this.location()
    },
    locationQingDao() {
      this.map.centerAndZoom(new BMapGL.Point(120.1723151201308, 35.95084641828497), 16)
      const bd1 = new BMapGL.Boundary()
      bd1.get('青岛市黄岛区', rs => {
        let count = rs.boundaries.length
        for (let i = 0; i < count; i++) {
          let path = []
          let str = rs.boundaries[i].replace(' ', '')
          let points = str.split(';')
          for (let j = 0; j < points.length; j++) {
            let lng = points[j].split(',')[0]
            let lat = points[j].split(',')[1]
            path.push(new BMapGL.Point(lng, lat))
          }
          //将点坐标练成直线
          this.map.addOverlay(
            new BMapGL.Polyline(path, {
              strokeColor: '#00BFDC',
              strokeWeight: 2,
              strokeOpacity: 0.5,
            })
          )

          //三维棱柱
          // this.addPrism(path);

          // 添加蒙版，只显示某个区域
          const xyArr = rs.boundaries[i].split(';')
          const ptArr = []
          for (let j = 0; j < xyArr.length; j++) {
            const tmp = xyArr[j].split(',')
            const pt = new BMapGL.Point(tmp[0], tmp[1])
            ptArr.push(pt)
          }
          // 添加蒙版，只显示某个区域
          // this.addMask(ptArr)
        }
      })
      // 显示3D建筑物
      this.showQDBuildings()
    },
    animate() {
      const keyFrames = [
        {
          center: new BMapGL.Point(106.53669628404171, 29.561991236310714),
          zoom: 16,
          tilt: 73,
          heading: 0,
          percentage: 0,
        },
        {
          center: new BMapGL.Point(106.53669628404171, 29.561991236310714),
          zoom: 17,
          tilt: 83,
          heading: 0,
          percentage: 0.3,
        },
        {
          center: new BMapGL.Point(106.53669628404171, 29.561991236310714),
          zoom: 19,
          tilt: 83,
          heading: 0,
          percentage: 0.9,
        },
        // {
        //     center: new BMapGL.Point(106.57007786974641, 29.578064843761332),
        //     zoom:19,
        //     tilt: 83,
        //     heading: 0,
        //     percentage: 1
        // }
      ]
      const opts = {
        duration: 5000,
        delay: 3600,
        interation: '1',
      }
      // 声明动画对象
      var animation = new BMapGL.ViewAnimation(keyFrames, opts)
      // 开始播放动画
      setTimeout(() => {
        this.map.startViewAnimation(animation)
      }, 0)
    },
    location() {
      const bd1 = new BMapGL.Boundary()
      bd1.get('重庆市渝中区', rs => {
        const path = []
        for (let j = 0; j < pathList.length; j++) {
          let lng = pathList[j][0]
          let lat = pathList[j][1]
          path.push(new BMapGL.Point(lng, lat))
        }
        //边界线
        this.map.addOverlay(new BMapGL.Polyline(path, { strokeColor: '#00BFDC', strokeWeight: 2, strokeOpacity: 0.5 }))

        //三维棱柱
        this.addPrism(path)

        // 添加蒙版，只显示某个区域
        this.addMask(path)

        // 显示3D建筑物
        this.showBuildings()

        // 添加发光点
        // this.addLight()

        // 添加遮罩背景图
        // this.addBackgoundImg()

        // 获取路线数据
        // this.getLineRoutes()

        //画热源
        // this.drawHot()

        // 添加蝌蚪线
        // this.getLineFlowLayer()
      })
    },
    showQDBuildings() {
      var data = geoQDJson.features
      var polygons = []
      var len = data.length
      for (var i = 0; i < len; i++) {
        var obj = data[i]
        var polygon = []
        let height = 5
        obj.geometry.coordinates[0].map((pt, index) => {
          polygon.push([pt[0], pt[1]])
          if (index === 0) {
            height = pt[2] * 5
          }
        })

        if (Math.random() > 0) {
          polygons.push({
            geometry: {
              type: 'Polygon',
              coordinates: [polygon],
            },
            properties: {
              height: height,
            },
          })
        }
      }
      var view = new mapvgl.View({
        map: this.map,
      })
      console.log(polygons)
      const rippleLayer = this.addRapper(view)
      var shaperLayer = new mapvgl.ShapeLayer({
        // style: 'ripple',
        // rippleLayer: rippleLayer,
        blend: 'lighter',
        isTextureFull: true,
        color: 'rgba(12, 147, 243, 1)',
        style: 'window',
        opacity: 1.0,
        // texture: 'images/textures/wall2.png',
        // textureScale: 0.05,
        // topColor: 'rgba(39, 50, 85, 1.0)',
      })
      view.addLayer(shaperLayer)
      shaperLayer.setData(polygons)

      this.addCircle(view)
      this.addMarkerList(view)

      var marker = new BMapGL.Marker({
        lng: 120.16562769300003,
        lat: 35.94220919900005,
      }) // 创建标注
      this.map.addOverlay(marker)
    },
    showBuildings() {
      var data = geoJson
      var polygons = []
      var len = data.length
      for (var i = 0; i < len; i++) {
        var line = data[i]
        var polygon = []
        var pt = [line[1] * 512, line[2] * 512]
        for (var j = 3; j < line.length; j += 2) {
          pt[0] += line[j] / 100 / 2
          pt[1] += line[j + 1] / 100 / 2
          polygon.push([pt[0], pt[1]])
        }

        polygons.push({
          geometry: {
            type: 'Polygon',
            coordinates: [polygon],
          },
          properties: {
            height: line[0] / 2,
          },
        })
      }
      var view = new mapvgl.View({
        map: this.map,
      })
      const rippleLayer = this.addRapper(view)
      var shaperLayer = new mapvgl.ShapeLayer({
        style: 'ripple',
        rippleLayer: rippleLayer,
        blend: 'lighter',
        isTextureFull: true,
        color: 'rgba(12, 147, 243, 1)',
        style: 'window',
        opacity: 1.0,
        // texture: 'images/textures/wall2.png',
        // textureScale: 0.05,
        // topColor: 'rgba(39, 50, 85, 1.0)',
      })
      view.addLayer(shaperLayer)
      shaperLayer.setData(polygons)

      this.addCircle(view)
      this.addMarkerList(view)
      this.animate()
    },

    addCircle(view) {
      var bubbleLayer = new mapvgl.CircleLayer({
        // 绘制带泡泡的圆
        type: 'bubble',
        size: size => 3 * size,
        // 扩散半径，支持直接设置和回调两种形式，size为点的大小
        radius(size) {
          return 3 * size
        },
        // 扩散时间
        duration: 1,
        // 渐隐时间
        trail: 1,
      })
      view.addLayer(bubbleLayer)
      bubbleLayer.setData(this.generatePointList(this.markerPoints))
    },
    getType(value) {
      return value > 22 ? 'hot' : value < 18 ? 'cool' : 'normal'
    },
    addMarkerList(view) {
      const data = this.markerPoints

      const pointList = this.generatePointList(data)
      data.map((item, index) => {
        const marker = new MarkerCanvas({
          text: data[index][2],
          value: data[index][3],
          type: this.getType(data[index][3]),
          width: 200,
          height: 170,
          textWidth: 150,
        })
        var customOverlay = new BMapGL.CustomOverlay(marker.getCanvas, {
          point: new BMapGL.Point(data[index][0], data[index][1]),
          offsetX: 50,
          offsetY: -5,
          // minZoom: 14,
          // maxZoom: 26,
          enableDraggingMap: true,
          properties: {
            text: data[index][2],
            width: 200,
            height: 170,
            textWidth: 150,
          },
        })
        // 添加自定义canvas到地图上
        this.map.addOverlay(customOverlay)
        // var layer = new mapvgl.IconLayer({
        //     width: 100,
        //     height: 153,
        //     offset: [0, -29],
        //     opacity: 0.8,
        //     icon: getCanvas('测试' + (index + 1)),
        //     enablePicked: true, // 是否可以拾取
        //     selectedIndex: -1, // 选中项
        //     selectedColor: '#ff0000', // 选中项颜色
        //     autoSelect: true, // 根据鼠标位置来自动设置选中项
        //     onClick: (e) => { // 点击事件
        //         console.log('click', e);
        //     },
        //     onDblClick: e => {
        //         console.log('double click', e);
        //     },
        //     onRightClick: e => {
        //         console.log('right click', e);
        //     }
        // });
        // view.addLayer(layer);
        // layer.setData(pointList[index]);
      })
    },
    addRapper(view) {
      var rippleLayer = new mapvgl.GroundRippleLayer({
        size: 20,
        speed: 5,
        opacity: 0.0,
        segs: 100,
        scale: 10,
        speed: 6,
        color: [12, 147, 243, 0.2],
      })

      view.startAnimation()

      view.addLayer(rippleLayer)
      var point = new BMapGL.Point(106.53669628404171, 29.561991236310714)
      var data = [
        {
          geometry: { type: 'Point', coordinates: [point.lng, point.lat] },
        },
      ]
      rippleLayer.setData(data)

      // 添加圆点
      var pointLayer = new mapvgl.PointLayer({
        blend: 'lighter',
        size: 15,
        color: 'rgba(102, 0, 204, 0.6)',
      })

      view.addLayer(pointLayer)
      pointLayer.setData(data)
      return rippleLayer
    },
    addMask(ptArr) {
      const mapmask = new BMapGL.MapMask(ptArr, {
        isBuildingMask: true,
        isPoiMask: true,
        isMapMask: true,
        showRegion: 'inside',
        topFillColor: '#5679ea',
        topFillOpacity: 0.5,
        sideFillColor: '#5679ea',
        sideFillOpacity: 0.9,
      })
      this.map.addOverlay(mapmask)
    },
    addBackgoundImg() {
      var pStart = new BMapGL.Point(119.5606761743405, 36.16506242445136)
      var pEnd = new BMapGL.Point(120.42167249402264, 35.56971998530923)
      var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat))
      var imgOverlay = new BMapGL.GroundOverlay(bounds, {
        type: 'image',
        url: 'https://maponline0.bdimg.com/sty/map_icons2x/MapRes/men.png?udt=20230705',
        opacity: 1,
      })
      imgOverlay.setZIndex(-1)
      this.map.addOverlay(imgOverlay)
    },
    addLight() {
      var view = new mapvgl.View({
        effects: [
          new mapvgl.BloomEffect({
            threshold: 0.7,
            blurSize: 2,
          }),
        ],
        map: this.map,
      })
      const data = this.getLinesData()
      const linedata = this.getLightData(data)
      // console.log(linedata);
      var shaperLayer = new mapvgl.ShapeLayer({
        texture: require('@/assets/light.jpg'),
        isTextureFull: true,
        // texture: 'images/heatmap.png',
        blend: 'lighter',
        color: [0.8, 0.8, 0.1],
        opacity: 1.0,
      })
      view.addLayer(shaperLayer)
      shaperLayer.setData(linedata)
    },
    addPrism(path) {
      let prism = new BMapGL.Prism(path, 150, {
        topFillColor: 'transparent',
        topFillOpacity: 0,
        sideFillColor: '#141419',
        sideFillOpacity: 0.8,
      })
      this.map.addOverlay(prism)
    },
    generatePointList(steps) {
      let list = []
      steps.map(step => {
        const type = this.getType(step[3])
        const colorMap = {
          hot: 'rgba(205,81,43,1)',
          normal: 'rgba(29,84,9,1)',
          cool: 'rgba(63,116,239,1)',
        }
        list.push({
          geometry: {
            type: 'Point',
            coordinates: step,
          },
          color: colorMap[type],
          // 圆的半径
          size: 20,
        })
      })
      return list
    },
    getLinesData() {
      return [
        [120.16488, 35.969034],
        [120.167218, 35.970259],
        [120.160456, 35.969866],
        [120.167627, 35.964952],
        [120.16529, 35.966263],
        [120.16306, 35.968532],
        [120.169794, 35.953331],
        [120.167751, 35.951702],
        [120.171318, 35.955754],
        [120.172374, 35.950521],
        [120.175217, 35.940053],
        [120.170375, 35.939405],
        [120.17232, 35.966916],
        [120.173634, 35.963238],
        [120.170139, 35.959633],
        [120.175956, 35.955031],
        [120.18365, 35.969459],
        [120.182518, 35.977251],
        [120.184507, 35.955581],
        [120.185903, 35.957313],
        [120.186338, 35.954531],
        [120.189703, 35.950136],
        [120.19287, 35.953241],
        [120.192911, 35.949715],
        [120.070947, 35.896241],
        [120.171363, 35.971379],
        [120.172862, 35.978955],
        [120.178748, 35.982765],
        [120.181863, 35.981481],
        [120.177406, 35.979025],
        [120.178659, 35.989941],
        [120.17838, 35.989164],
        [120.180254, 35.988033],
        [120.20053, 35.963378],
        [120.159056, 35.991698],
        [120.152191, 35.989127],
        [120.157079, 35.991181],
        [119.865395, 35.925693],
        [120.151522, 35.990176],
        [120.155475, 35.984116],
        [120.165958, 35.99442],
        [120.179312, 35.990956],
        [120.164334, 35.950068],
        [120.181768, 35.994067],
        [120.158838, 35.964983],
        [120.173539, 35.976686],
        [120.166417, 35.990454],
        [120.167865, 35.993918],
        [120.15835, 35.993349],
        [120.172841, 35.964708],
        [120.178873, 35.97801],
        [120.16916, 35.966574],
        [120.192806, 35.967216],
        [120.181874, 35.960811],
        [120.159704, 35.971906],
        [120.18673, 35.957133],
      ]
    },
    getLightData(data) {
      let linedata = []
      data.map(center => {
        let coor = []
        let x = center[0] - 0.015
        let y = center[1] + 0.015
        coor.push([x, y])
        coor.push([x, y - 0.003])
        coor.push([x + 0.003, y - 0.003])
        coor.push([x + 0.003, y])
        linedata.push({
          geometry: {
            type: 'Polygon',
            coordinates: [coor],
          },
          properties: {
            count: Math.round(Math.random() * 10) + 5,
          },
        })
        var marker = new BMapGL.Marker({
          lng: center[0],
          lat: center[1],
        }) // 创建标注
        this.map.addOverlay(marker)
      })
      return linedata
    },
    getLineRoutes(origin, destination) {
      const url = `http://10.10.5.209:8015/intelligentHeating/baidu/routePlanning/driving?origin=${origin}&destination=${destination}`
      return fetch(url)
        .then(res => {
          return res.json()
        })
        .then(data => {
          const steps = data.result.rightMsg && data.result.rightMsg.routes[0].steps
          // console.log(steps);
          return steps || []
        })
    },
    generateGeoJson(steps) {
      let list = []
      steps.map(step => {
        list.push([step.start_location.lng, step.start_location.lat])
        list.push([step.end_location.lng, step.end_location.lat])
      })
      return {
        geometry: {
          type: 'LineString',
          coordinates: list,
        },
      }
    },
    generateLineData(steps) {
      let list = []
      steps.map(step => {
        list = list.concat([step.start_location])
        list = list.concat([step.end_location])
      })
      return list
    },
    async getLineFlowLayer() {
      // 添加蝌蚪线
      var view = new mapvgl.View({
        map: this.map,
      })
      var lineLayer = new mapvgl.LineLayer({
        color: 'rgba(255, 71, 26, 0.9)',
        width: 4,
        animation: true,
        duration: 3, // 循环时间2s
        trailLength: 0.2, // 拖尾长度占间隔的0.4
        interval: 0.2, // 粒子长度占线整体长度的0.2
      })

      view.addLayer(lineLayer)
      const lineData = this.getLinesData()
      const origin = '35.96475203592686,120.01498093217019'
      let list = []
      let polylineDataList = []
      let layerList = localStorage.getItem('layerList')
      layerList = layerList ? JSON.parse(layerList) : []
      if (layerList && layerList.length > 1) {
        console.log('从本地存储里面获取的数据')
        list = layerList
        polylineDataList = localStorage.getItem('polylineList')
        polylineDataList = polylineDataList ? JSON.parse(polylineDataList) : []
        lineLayer.setData(list)
        polylineDataList.map(polylineData => {
          this.map.addOverlay(
            new BMapGL.Polyline(polylineData, {
              strokeColor: '#00BFDC',
              strokeWeight: 2,
              strokeOpacity: 0.5,
            })
          )
        })
      } else {
        console.log('从远程接口里面获取的数据')
        lineData.map(async line => {
          const steps = await this.getLineRoutes(origin, line[1] + ',' + line[0])
          //  console.log(steps);
          if (steps.length > 0) {
            const layerData = this.generateGeoJson(steps)
            const polylineData = this.generateLineData(steps)

            list.push(layerData)
            polylineDataList.push(polylineData)
            lineLayer.setData(list)
            this.map.addOverlay(
              new BMapGL.Polyline(polylineData, {
                strokeColor: '#00BFDC',
                strokeWeight: 2,
                strokeOpacity: 0.5,
              })
            )

            localStorage.setItem('layerList', JSON.stringify(list))
            localStorage.setItem('polylineList', JSON.stringify(polylineDataList))
          }
        })
      }
    },
    drawHot() {
      var view = new mapvgl.View({
        map: this.map,
      })
      var waveLayer = new mapvgl.CircleLayer({
        // 绘制带波纹扩散的圆
        type: 'wave',
        color: 'red',
        // 扩散半径，支持直接设置和回调两种形式
        radius: r => 1.6 * r,
        // 周期影响扩散速度，越小越快
        duration: 1 / 3,
        // 拖尾影响波纹数，越大越多
        trail: 4,
      })
      view.addLayer(waveLayer)
      waveLayer.setData([
        {
          geometry: {
            type: 'Point',
            color: 'red',
            coordinates: [120.01498093217019, 35.96475203592686],
          },
        },
      ])
    },
    //数据大屏自适应函数
    handleScreenAuto() {
      const designDraftWidth = 1920 //设计稿的宽度
      const designDraftHeight = 1080 //设计稿的高度
      //根据屏幕的变化适配的比例
      const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight ? document.documentElement.clientWidth / designDraftWidth : document.documentElement.clientHeight / designDraftHeight
      const clientRatio = document.documentElement.clientWidth / document.documentElement.clientHeight
      const designRatio = designDraftWidth / designDraftHeight
      console.log(clientRatio, designRatio, scale)
      //缩放比例
      document.querySelector('#container').style.transform = `scale(${scale}) translate(-50%, -50%)`
    },
  },
  mounted() {
    this.baidu()
    this.handleScreenAuto()
    window.onresize = () => {
      this.handleScreenAuto()
    }
  },
}
</script>

<style lang="scss">
.BMap_noprint.anchorTR {
  bottom: 92%;
  left: 50%;
}
.anchorBL,
.BMap_cpyCtrl {
  display: none;
}
</style>
<style scoped lang="scss">
html,
body,
#app,
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  background: #161827;
}
.map {
  background-image: none !important;
  overflow: hidden;
  margin: 0;
}
.BMap_noprint.anchorBR {
  width: 52px;
  height: 55px;
}
.container {
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 1920px; //设计稿的宽度
  height: 1080px; //设计稿的高度
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
}
.home {
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.home-wrapper {
  position: relative;
  pointer-events: none;
  transform-origin: center center;
}
#screen {
  display: inline-block;
  width: 1920px; //设计稿的宽度
  height: 1080px; //设计稿的高度
  transform-origin: 0;
  position: fixed;
  top: 0;
  left: 0;
}

.btn-wrap {
  z-index: 999;
  position: fixed;
  bottom: 3.5rem;
  margin-left: 3rem;
  padding: 1rem 1rem;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
}

.btn {
  width: 75px;
  height: 30px;
  float: left;
  background-color: #fff;
  color: rgba(27, 142, 236, 1);
  font-size: 14px;
  border: 1px solid rgba(27, 142, 236, 1);
  border-radius: 5px;
  margin: 0 5px;
  text-align: center;
  line-height: 30px;
}

.btn:hover {
  background-color: rgba(27, 142, 236, 0.8);
  color: #fff;
  cursor: pointer;
}
</style>
