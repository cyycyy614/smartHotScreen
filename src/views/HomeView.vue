<template>
  <div class="home">
    <div id="map" class="map"></div>
    <ul class="btn-wrap" style="z-index: 99">
      <li class="btn" @click="showRule()">显示轨迹</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { loadBaiDuDrawMap } from '@/plugins/map'
import { initMap } from '@/plugins/common'

export default {
  name: 'HomeView',
  data() {
    return {
      carImg: '',
      BMapGL: {},
      map: {},
    }
  },
  methods: {
    init() {
      loadBaiDuDrawMap().then(BMapGL => {
        console.log(BMapGL)
        this.BMapGL = BMapGL
        let map = new BMapGL.Map('map')
        this.map = map
        map.centerAndZoom(new BMapGL.Point(116.28019, 40.049191), 16)
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5)
        map.setTilt(53)

        // 监听事件
        map.addEventListener('click', e => {
          console.log('click', e)
        })
        map.addEventListener('zoomstart', e => {
          console.log('zoom start', e)
        })

        // // 创建炫光处理通道
        // var bright = new mapvgl.BrightEffect({
        //     threshold: 0.2,
        //     blurSize: 2.0,
        //     clarity: 0.8
        // });
        // // 2. 创建MapVGL图层管理器
        // var view = new mapvgl.View({
        //   // effects: [new mapvgl.BloomEffect()],
        //   effects: [bright],
        //   map: map,
        // });

        // // 3. 创建可视化图层，并添加到图层管理器中
        // var layer = new mapvgl.LineLayer({
        //   lineCap: "round",
        //   blend: "lighter",
        //   width: 10,
        //   // animation: true,
        //   // interval: 0.8,
        //   // color: 'rgba(255, 71, 26, 0.8)',
        //   color: "rgba(139,243,255, 0.6)",
        // });
        // view.addLayer(layer);

        // var lintLayer = new mapvgl.LineFlowLayer({
        //   color: "rgba(139,243,233, 1)",
        //   interval: 0.9,
        //   duration: 2,
        //   trailLength: 0.9,
        //   width: 10,
        //   // textureColor: 'rgba(0, 153, 255, 0.8)',
        //   // color: 'rgba(0, 255, 255, 1)'
        // });
        // view.addLayer(lintLayer);

        // // 4. 准备好规范化坐标数据
        // var data = [
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [116.28019, 40.049191],
        //         [116.287259, 40.043672],
        //       ],
        //     },
        //   },
        // ];

        // // 5. 关联图层与数据，享受震撼的可视化效果
        // layer.setData(data);
        // lintLayer.setData(data);
        // view.startAnimation();

        // const lineLayer1 = new BMapGL.LineLayer({
        //   enablePicked: false,
        //   autoSelect: true,
        //   pickWidth: 30,
        //   pickHeight: 30,
        //   selectedColor: "yellow", // 选中项颜色
        //   style: {
        //     // borderMask: false,
        //     borderColor: "green", //'rgba(27, 142, 236, .6)',
        //     borderWeight: 2,
        //     strokeWeight: 3,
        //     strokeStyle: "dashed",
        //     strokeLineJoin: "round",
        //     strokeColor: "red", //'#6704ff',
        //   },
        // });
        // var data1 = {
        //   type: "FeatureCollection",
        //   features: [
        //     {
        //       type: "Feature",
        //       properties: { name: "demo2" },
        //       geometry: {
        //         type: "LineString",
        //         coordinates: [
        //           [116.29019, 40.049191],
        //           [116.297259, 40.043672],
        //         ],
        //       },
        //     },
        //   ],
        // };
        // lineLayer1.setData(data1);
        // map.addNormalLayer(lineLayer1);

        // // 创建小车图标
        // var myIcon = new BMapGL.Icon(
        //   require("@/assets/logo.png"),
        //   new BMapGL.Size(52, 52)
        // );
        // // 创建Marker标注，使用小车图标
        // // var pt = new BMapGL.Point(116.29119, 40.049191);
        // var pt = new BMapGL.Point(116.29019, 40.049191);
        // var marker = new BMapGL.Marker(pt, {
        //   icon: myIcon,
        // });
        // // 将标注添加到地图
        // map.addOverlay(marker);
        // console.log("init", marker.getIcon());

        // var marker1 = new BMapGL.Marker(
        //   new BMapGL.Point(116.29019, 40.049191),
        //   {
        //     icon: new BMapGL.SVGSymbol(
        //       "m0,-10c-0.20885,0 -0.39491,0.08583 -0.55177,0.24149c-0.15674,0.15536 -0.28646,0.37838 -0.39429,0.65665c-0.21586,0.55655 -0.34853,1.33844 -0.42114,2.27477c-0.07231,0.93446 -0.08474,2.02273 -0.05447,3.18765c-2.58175,1.05925 -7.81787,3.24648 -8.23854,3.73474c-0.56001,0.65029 -0.37908,1.3954 -0.15331,1.89002l8.608,-1.75235c0.18202,2.28374 0.4407,4.5455 0.66615,6.31771c-0.8418,0.24646 -2.41323,0.73303 -2.73754,1.03474c-0.4469,0.41562 -0.4469,1.75793 -0.4469,1.75793l3.52318,-0.28665c0.08286,0.57874 0.13486,0.9163 0.13486,0.9163l0.00511,0.03042l0.02778,0l0.06486,0l0.02778,0l0.00511,-0.03042c0,0 0.05185,-0.33756 0.13486,-0.9163l3.52424,0.28665c0,0 0,-1.34231 -0.44688,-1.75793c-0.32446,-0.30172 -1.89697,-0.7895 -2.73847,-1.0358c0.22484,-1.76681 0.4832,-4.02001 0.66507,-6.29634l8.50712,1.73203c0.22561,-0.49462 0.40765,-1.23973 -0.15237,-1.89002c-0.41538,-0.48221 -5.52504,-2.62071 -8.1386,-3.69423c0.03119,-1.17999 0.01971,-2.28285 -0.05353,-3.22816l0,-0.00233c-0.07263,-0.93523 -0.20545,-1.71635 -0.42114,-2.27244c-0.10784,-0.27827 -0.23634,-0.50114 -0.3932,-0.65665c-0.15689,-0.15567 -0.34293,-0.24149 -0.55195,-0.24149l0,0l0,0l0,0l0.00001,0l0,0l-0.00003,0.00001z",
        //       {
        //         fillColor: "#E4F4F4",
        //         fillOpacity: 0.8,
        //         scale: 3,
        //         rotation: 0,
        //         strokeOpacity: 1,
        //       }
        //     ),
        //   }
        // );
        // map.addOverlay(marker1);

        // // var marker2 = new BMapGL.Marker(new BMapGL.Point(116.29019, 40.049191));
        // // map.addOverlay(marker2);

        // // 创建点标记
        // var point = new BMapGL.Point(116.29219, 40.049191);
        // map.centerAndZoom(point, 15);
        // var marker4 = new BMapGL.Marker(point);
        // map.addOverlay(marker4);
        // // 创建信息窗口
        // var opts = {
        //     width: 200,
        //     height: 100,
        //     title: '故宫博物院'
        // };
        // var infoWindow = new BMapGL.InfoWindow('地址：北京市东城区王府井大街88号乐天银泰百货八层', opts);
        // // 点标记添加点击事件
        // marker4.addEventListener('click', function () {
        //     map.openInfoWindow(infoWindow, point); // 开启信息窗口
        // });

        // map.addEventListener("zoomend", (e) => {
        //   let zoom = map.getZoom();
        //   console.log("zoom end", zoom);

        //   let rate = (zoom / 16)
        //   rate  = rate < 1 ? rate * 0.5 : rate
        //   const offset =  rate < 1 ? rate * 0.25 : rate * 0.5
        //   // 图片类
        //   const icon = marker.getIcon();
        //   icon.size.width = 52 * rate;
        //   icon.size.height = 52 * rate;
        //   icon.anchor.width = 52 * offset;
        //   icon.anchor.height = 52 * offset;
        //   marker.setIcon(icon);

        //   // svg
        //   const svg = marker1.getIcon()
        //   svg.setScale( 3 * rate)
        //   // svg.scale = 3 * (zoom / 16)
        //   // console.log(svg);
        //   marker1.setIcon(svg)

        //   // 线段
        //   // view.removeLayer(layer)
        //   layer.options.width = 10 * rate;
        //   console.log(layer)
        //   view.addLayer(layer);

        //   if(zoom < 13) {
        //     marker.hide()
        //     marker1.hide()
        //   } else {
        //     marker.show()
        //     marker1.show()
        //   }
        // });
      })
    },
    showRule() {
      var path = [
        {
          lng: 116.297611,
          lat: 40.047363,
        },
        {
          lng: 116.302839,
          lat: 40.048219,
        },
        {
          lng: 116.308301,
          lat: 40.050566,
        },
        {
          lng: 116.305732,
          lat: 40.054957,
        },
        {
          lng: 116.304754,
          lat: 40.057953,
        },
        {
          lng: 116.306487,
          lat: 40.058312,
        },
        {
          lng: 116.307223,
          lat: 40.056379,
        },
      ]
      var point = []
      for (var i = 0; i < path.length; i++) {
        point.push(new this.BMapGL.Point(path[i].lng, path[i].lat))
      }
      var pl = new this.BMapGL.Polyline(point)
      let map = this.map
      // setTimeout('start()', 3000);
      function start() {
        const trackAni = new BMapGLLib.TrackAnimation(map, pl, {
          overallView: true,
          color: 'red',
          tilt: 30,
          duration: 20000,
          delay: 300,
        })
        trackAni.start()
      }
      start()
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style scoped lang="scss">
html,
body,
.home,
#app,
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}
.map {
  width: 100%;
  height: calc(100vh - 10px);
  overflow: hidden;
  margin: 0;
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
