<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->
<template>
  <div class="home">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { loadBaiDuDrawMap } from '@/plugins/map'
import { nightStyle, darkStyle, snowStyle, blueStyle } from '@/plugins/common'
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
        map.centerAndZoom(new BMapGL.Point(120.1723151201308, 35.95084641828497), 18)
        map.enableScrollWheelZoom(true)
        map.setHeading(10)
        map.setTilt(73)
        map.setMapStyleV2({ styleJson: blueStyle })

        var navi3DCtrl = new BMapGL.NavigationControl3D() // 添加3D控件
        map.addControl(navi3DCtrl)
        // map.setMapType(BMAP_EARTH_MAP);

        // var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        // map.addControl(zoomCtrl);

        // 创建点标记
        var point = new BMapGL.Point(120.1723151201308, 35.95084641828497)
        // map.centerAndZoom(point, 15);
        var marker4 = new BMapGL.Marker(point)
        map.addOverlay(marker4)

        this.getHuangDao(map)
        // this.SearchArea('青岛市芙蓉苑', map)
        // this.getArea(map)

        // 监听事件
        map.addEventListener('click', e => {
          console.log('click', e)
        })
        map.addEventListener('zoomend', e => {
          let zoom = map.getZoom()
          console.log('zoom zoomend', zoom)
        })
      })
    },
    getHuangDao(map) {
      var bdary = new BMapGL.Boundary()
      bdary.get('山东省青岛市黄岛区', function (rs) {
        //获取行政区域
        console.log(rs)
        map.clearOverlays() //清除地图覆盖物
        var count = rs.boundaries.length //行政区域的点有多少个
        var pointArray = []
        for (var i = 0; i < count; i++) {
          var ply = new BMapGL.Polygon(rs.boundaries[i], {
            strokeWeight: 1,
            strokeColor: '#00C9E3',
            strokeOpacity: 0.9,
            // fillColor: 'red',
            // fillColor: ['#BA8330', 'red'],
            fillColor: '#063464',
            fillOpacity: 0.8,
          }) //建立多边形覆盖物
          // map.addOverlay(ply) //添加覆盖物

          pointArray = pointArray.concat(ply.getPath())
          var prism = new BMapGL.Prism(ply.getPath(), 5000, {
            // topFillColor: '#013566',
            // topFillOpacity: 0.3,
            // sideFillColor: '#002D6F',
            // sideFillOpacity: 0.8,
            topFillColor: '#063464',
            topFillOpacity: 0.1,
            sideFillColor: '#04347E',
            sideFillOpacity: 0.9,
          })
          map.addOverlay(prism)

          // 添加边框立体颜色
          // let view = new mapvgl.View({
          //   // effects: [new mapvgl.BloomEffect()],
          //   map: map,
          // })
          // var wallLayer = new mapvgl.WallLayer({
          //   // gradient: {
          //   //   0: 'rgba(204, 153, 255, 0.5)',
          //   //   1: 'rgba(0, 0, 204, 0.2)',
          //   // },
          //   color: 'rgba(50, 50, 200, 1)',
          //   height: 6000,
          //   data: [
          //     {
          //       geometry: {
          //         type: 'LineString',
          //         coordinates: [pointArray],
          //       },
          //     },
          //   ],
          // })
          // view.addLayer(wallLayer)
          // wallLayer.setData(pointArray)

          var xyArr = rs.boundaries[i].split(';')
          var ptArr = []
          for (var j = 0; j < xyArr.length; j++) {
            var tmp = xyArr[j].split(',')
            var pt = new BMapGL.Point(tmp[0], tmp[1])
            ptArr.push(pt)
          }
          var mapmask = new BMapGL.MapMask(ptArr, {
            isBuildingMask: true,
            isPoiMask: true,
            isMapMask: true,
            showRegion: 'inside',
            topFillColor: '#5679ea',
            topFillOpacity: 0.5,
            sideFillColor: '#5679ea',
            sideFillOpacity: 0.9,
          })
          map.addOverlay(mapmask)
        }
        map.setViewport(pointArray) //调整视野
        setTimeout(() => {
          map.setTilt(53)
          // map.setHeading(64);
        }, 2000)
      })
    },
    getArea(map) {
      this.showArea('深圳', '南方科技大学', map)
      // this.showArea('青岛', '鲁商南岸国际小区', map)
    },
    SearchArea(area, map) {
      var options = {
        onSearchComplete: results => {
          console.log(results)
          // 判断状态是否正确
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            console.log('开始查询')
            const pointInfo = results.getPoi(1)
            var urlMap = `http://map.baidu.com/?reqflag=pcmap&coord_type=3&from=webmap&qt=ext&ext_ver=new&l=18&uid=${pointInfo.uid}`
            this.$jsonp(urlMap, {
              callbackQuery: 'callback',
              callbackName: 'queryHouseOutlineCallback',
            }).then(async houseOutline => {
              console.log(houseOutline)
              var geo = houseOutline.content.geo
              if (!geo) {
                var point = pointInfo.point
                map.centerAndZoom(point, 19)
                var marker = new BMapGL.Marker(point)
                // marker.setAnimation(BMAPGL_ANIMATION_BOUNCE);
                map.addOverlay(marker)
              } else {
                map.clearOverlays()
                var geoObj = this.parseGeo(geo)
                //var bounds = coordinateToPoints(geoObj.bound);
                //边界点
                var points = await this.coordinateToPoints(map, geoObj.points)
                var ply = new BMapGL.Polygon(points, {
                  strokeWeight: 3,
                  strokeColor: '#FFC66D',
                  strokeOpacity: 1,
                  fillColor: '#000000',
                  fillOpacity: 0.3,
                }) //建立多边形覆盖物
                map.addOverlay(ply) //添加覆盖物
                // map.setViewport(ply.getPath()); //调整视野
                map.setTilt(73)
              }
            })
          }
        },
      }
      var local = new BMapGL.LocalSearch(map, options)
      local.search(area)
    },
    showArea(city, house, map) {
      var that = this
      var url = 'http://api.map.baidu.com/place/v2/search?output=json&scope=1' + '&q=' + house + '&region=' + city + '&ak=fX3RxiG1a3EV1fQGYBzzCFojr1z82udK'

      this.$jsonp(url, {
        callbackQuery: 'callback',
        callbackName: 'queryHouseCallback',
      }).then(data => {
        console.log(data)
        if (data.message == 'ok') {
          var houses = data.results
          if (houses && houses.length > 0) {
            var house = houses[0]
            var urlMap = 'http://map.baidu.com/?reqflag=pcmap&coord_type=3&from=webmap&qt=ext&ext_ver=new&l=18&uid=' + house.uid
            this.$jsonp(urlMap, {
              callbackQuery: 'callback',
              callbackName: 'queryHouseOutlineCallback',
            }).then(async houseOutline => {
              console.log(houseOutline)
              var geo = houseOutline.content.geo

              const test = [new BMapGL.Point(116.387112, 39.920977), new BMapGL.Point(116.385243, 39.913063), new BMapGL.Point(116.394226, 39.917988), new BMapGL.Point(116.401772, 39.921364), new BMapGL.Point(116.41248, 39.927893)]
              console.log('test', test)
              if (!geo) {
                var location = house.location
                var point = new BMapGL.Point(location.lng, location.lat)
                map.centerAndZoom(point, 19)
                var marker = new BMapGL.Marker(point)
                // marker.setAnimation(BMAPGL_ANIMATION_BOUNCE);
                map.addOverlay(marker)
              } else {
                map.clearOverlays()
                var geoObj = that.parseGeo(geo)
                //var bounds = coordinateToPoints(geoObj.bound);
                //边界点
                var points = await that.coordinateToPoints(map, geoObj.points)
                console.log('转换点', points)
                var ply = new BMapGL.Polygon(points, {
                  strokeWeight: 2,
                  strokeColor: '#F01B2D',
                  strokeOpacity: 0.9,
                  fillColor: '#FFEBCC',
                }) //建立多边形覆盖物
                map.addOverlay(ply) //添加覆盖物
                map.setViewport(ply.getPath()) //调整视野
              }
            })
          }
        }
      })
    },

    coordinateToPoints(map, coordinate) {
      return new Promise((resolve, reject) => {
        let translatePoint = []
        if (coordinate) {
          let arr = coordinate.split(';')
          const mkPoints = []
          if (arr) {
            for (var i = 0; i < arr.length; i++) {
              let coord = arr[i].split(',')
              if (coord && coord.length == 2) {
                var mctXY = new BMapGL.Pixel(coord[0], coord[1])
                // console.log(mctXY)
                var ggPoint = new BMapGL.Point(mctXY.x, mctXY.y)
                // var project = map.getMapType().getProjection();
                // var point = project.pointToLngLat(mctXY);
                // points.push(new BMapGL.Point(point.lng, point.lat));
                mkPoints.push(ggPoint)
              }
            }

            // let convertor = new BMapGL.Convertor();
            // const translateCallback = function (data){

            //   if(data.status === 0) {
            //     resolve(data.points)
            //   } else {
            //     reject([])
            //   }
            // }
            // convertor.translate(mkPoints, COORDINATES_BD09_MC, COORDINATES_BD09, translateCallback)

            let total = 0
            let groupCount = 0 // 每次转10条
            if (mkPoints.length % 10 > 0) {
              groupCount = mkPoints.length / 10 + 1
            } else {
              groupCount = mkPoints.length / 10
            }
            console.log('mkPoints', mkPoints)
            for (let i = 0; i < groupCount; i++) {
              // 外层循环，有多少十条
              var pos = new Array()
              for (let j = 0; j < 10; j++) {
                // 内循环，每组十条
                if (total < mkPoints.length) {
                  let point = new BMapGL.Point(mkPoints[i * 10 + j].lng, mkPoints[i * 10 + j].lat)
                  pos.push(point)
                }
                total++
              }
              let convertor = new BMapGL.Convertor()
              convertor.translate(pos, 6, 5, function (data) {
                if (data.status === 0) {
                  for (let x = 0; x < data.points.length; x++) {
                    translatePoint.push(new BMapGL.Point(data.points[x].lng, data.points[x].lat))
                  }
                }
              })
            }
          }

          setTimeout(() => {
            resolve(translatePoint)
          }, 2000)
        }
      })
    },
    parseGeo(mocator) {
      if (typeof mocator != 'string') {
        return {}
      }
      var t = mocator.split('|')
      var n = parseInt(t[0])
      var i = t[1]
      var r = t[2]
      var o = r.split(';')
      if (n === 4) {
        for (var a = [], s = 0; s < o.length - 1; s++) {
          '1' === o[s].split('-')[0] && a.push(o[s].split('-')[1])
        }
        o = a
        o.push('')
      }
      var u = []
      switch (n) {
        case 1:
          u.push(o[0])
          break
        case 2:
        case 3:
        case 4:
          for (var s = 0; s < o.length - 1; s++) {
            var l = o[s]
            if (l.length > 100) {
              l = l.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, '$1,$2;')
              u.push(l)
            } else {
              for (var c = [], d = l.split(','), f = 0; f < d.length; f += 2) {
                var p = d[f]
                var h = d[f + 1]
                c.push(p + ',' + h)
              }
              u.push(c.join(';'))
            }
          }
          break
        default:
          break
      }

      if (u.length <= 1) {
        u = u.toString()
      }

      var result = {
        type: n,
        bound: i,
        points: u,
      }
      return result
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
