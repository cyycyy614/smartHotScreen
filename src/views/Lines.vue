<template>
  <div class="home">
    <div id="map" class="map"></div>
    <ul class="btn-wrap">
      <li class="btn" @click="handleCreate">打点</li>
      <li class="btn" :disabled="isEdit" @click="handleCanEdit">开启编辑</li>
      <li class="btn" :disabled="!isEdit" @click="handleCancleEdit">关闭编辑</li>
      <li class="btn" @click="handleSave">生成json</li>
    </ul>
  </div>
</template>

<script>
import { lazyBMapApiLoaderInstance } from 'vue-bmap-gl'
import { nightStyle, darkStyle, snowStyle } from '@/plugins/common'

export default {
  data () {
    return {
      json: [],
      pointList: [],
      markerList: [],
      status: 'map',
      isEdit: false,
      polyline: null,
      position_NKYYGS: {
        Name: '四川省农业科学院',
        address: '成都市锦江区静居寺路20号',
        phoneNumber: '(028)84504011',
        bdLNG: 116.297611,
        bdLAT: 40.047363,
      },
      map: '',
      pathArr: [
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
          lng: 116.307223,
          lat: 40.056379,
        },
        {
          lng: 116.306487,
          lat: 40.058312,
        },
      ]
    }
  },
  mounted () {
    this.baidu()
  },
  methods: {
    handleCreate(){
      this.status = 'create'
    },
    handleSave(){
      this.status = 'map'
      const data = {
        geometry: {
          type: 'LineString',
          coordinates: this.getPointArr()
        }
      }
      this.json.push({
        geometry: {
          type: 'LineString',
          coordinates: this.getPointArr()
        }
      })
      console.log(JSON.parse(JSON.stringify(data)));
      this.polyline && this.map.removeOverlay(this.polyline)
      this.markerList && this.map.removeOverlay(this.markerList)
      
      this.pointList = []
      this.markerList = []
      this.json = []
    },
    handleCanEdit(){
      this.isEdit = true
      this.polyline && this.polyline.enableEditing();
    },
    handleCancleEdit(){
      this.isEdit = false
      this.polyline && this.polyline.disableEditing();
    },
    baidu () {
      lazyBMapApiLoaderInstance.load().then(this.initMap())
    },
    // 百度地图
    baiduMap () {
      this.map = new BMapGL.Map('map') // 创建Map实例
      this.map.centerAndZoom(new BMapGL.Point(120.1723151201308, 35.95084641828497), 11) // 初始化地图,设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      this.map.addControl(new BMapGL.NavigationControl()) // 添加控件类(平移缩放控件)
      this.map.clearOverlays()

      var sContent =
        '<div style="width:300px;"><p style="font-size:16px;font-weight:bold;margin-top: 10px;color:#D07852">' +
        this.position_NKYYGS.Name +
        '</p><p style="font-size:13px;margin: 5px 0;">地址：' +
        this.position_NKYYGS.address +
        '</p><p style="font-size:13px;margin: 5px 0;">电话：' +
        this.position_NKYYGS.phoneNumber +
        '</p><p style="font-size:13px;margin: 5px 0;">坐标：' +
        this.position_NKYYGS.bdLNG +
        ',' +
        this.position_NKYYGS.bdLAT
        ; ('</div>')
      // this.map.setMapType(BMAP_EARTH_MAP) // 设置地图类型为地球模式
      // var point = new BMapGL.Point(this.position_NKYYGS.bdLNG, this.position_NKYYGS.bdLAT) // 创建点坐标
      // var marker = new BMapGL.Marker(point) // 创建标注
      // this.map.addOverlay(marker) //添加标注到地图
      // this.map.centerAndZoom(point, 18) // 初始化地图，设置中心点坐标和地图级别

      // 创建点标记
      var marker = new BMapGL.Marker(point)
      this.map.addOverlay(marker)
      // 创建信息窗口

      // // 创建信息窗口
      // var opts = {
      //   width: 200,
      //   height: 100,
      //   title: '故宫博物院',
      // }
      // var infoWindow = new BMapGL.InfoWindow(sContent)
      //  //点击图标时候调用信息窗口
      // marker.addEventListener('click', function () {
      //   this.openInfoWindow(infoWindow)
      //   console.log("点标记")
      // })

      var path = []
      path = this.pathArr

      var point = []
      for (var i = 0;i < path.length;i++) {
        point.push(new BMapGL.Point(path[i].lng, path[i].lat))
      }
      path.forEach(item => {
        // console.log(item)
        var point = new BMapGL.Point(item.lng, item.lat) // 创建点坐标
        var marker = new BMapGL.Marker(point) // 创建标注
        this.map.addOverlay(marker) //添加标注到地图
        var opts = {
          width: 200,
          height: 100,
          title: '故宫博物院',
        }
        var infoWindow = new BMapGL.InfoWindow('地址：北京市东城区王府井大街88号乐天银泰百货八层', opts)
        // 点击标注开启一个自定义窗口
        marker.addEventListener('click', function () {
          this.openInfoWindow(infoWindow, point)
        })
      })
      //将点坐标练成直线
      this.map.addOverlay(new BMapGL.Polyline(point, { strokeColor: 'blue', strokeWeight: 6, strokeOpacity: 0.5 })) //地图类型
    },
    // 3d地图
    initMap () {
      const map = new BMapGL.Map('map') // 创建Map实例
      // map.centerAndZoom(new BMapGL.Point(120.1723151201308, 35.95084641828497), 11)
      map.centerAndZoom(new BMapGL.Point(106.542353,29.565448), 16)
      map.enableScrollWheelZoom(true)
      // map.setHeading(10)
      // map.setTilt(53)
      // map.setMapStyleV2({ styleJson: nightStyle })

      this.map = map
      // 监听事件
      this.map.addEventListener('click', e => {
          console.log('click', e.latlng)
          if(this.status == 'create'){
            this.createPoint(e.latlng)
          }
          
      })
      this.getLightData()
      this.location()
    },
    createPoint(point){
      this.pointList.push(point)
      var marker = new BMapGL.Marker(point) // 创建标注
      this.map.addOverlay(marker) //添加标注到地图
      this.markerList.push(marker)

      this.polyline && this.map.removeOverlay(this.polyline)
      this.polyline = new BMapGL.Polyline(this.pointList, { strokeColor: 'blue', strokeWeight: 6, strokeOpacity: 0.5 })
      this.map.addOverlay(this.polyline)
    },
    getPointArr(){
      let list = []
       this.pointList.map(item => {
        list.push([item.lng,item.lat])
       })
       return list
    },
    initCreate(){
      this.pointList = []
      this.map.remove
    },
    getLinesData(){
      return [
            [120.16488,35.969034], 
            [120.167218,35.970259], 
            [120.160456,35.969866], 
            [120.167627,35.964952], 
            [120.16529,35.966263], 
            [120.16306,35.968532], 
            [120.169794,35.953331], 
            [120.167751,35.951702], 
            [120.171318,35.955754], 
            [120.172374,35.950521], 
            [120.175217,35.940053], 
            [120.170375,35.939405], 
            [120.17232,35.966916], 
            [120.173634,35.963238], 
            [120.170139,35.959633],
            [120.175956,35.955031],
            [120.18365,35.969459],
            [120.182518,35.977251],
            [120.184507,35.955581],
            [120.185903,35.957313],
            [120.186338,35.954531],
            [120.189703,35.950136],
            [120.19287,35.953241],
            [120.192911,35.949715],
            [120.070947,35.896241],
            [120.171363,35.971379],
            [120.172862,35.978955],
            [120.178748,35.982765],
            [120.181863,35.981481],
            [120.177406,35.979025],
            [120.178659,35.989941],
            [120.17838,35.989164],
            [120.180254,35.988033],
            [120.20053,35.963378],
            [120.159056,35.991698],
            [120.152191,35.989127],
            [120.157079,35.991181],
            [119.865395,35.925693],
            [120.151522,35.990176],
            [120.155475,35.984116],
            [120.165958,35.99442],
            [120.179312,35.990956],
            [120.164334,35.950068],
            [120.181768,35.994067],
            [120.158838,35.964983],
            [120.173539,35.976686],
            [120.166417,35.990454],
            [120.167865,35.993918],
            [120.15835,35.993349],
            [120.172841,35.964708],
            [120.178873,35.97801],
            [120.16916,35.966574],
            [120.192806,35.967216],
            [120.181874,35.960811],
            [120.159704,35.971906],
            [120.18673,35.957133]
          ]
    },
    getLightData(){
      let data = this.getLinesData()
      let linedata = []
      data.map(center => {
        let coor = []
        let x = center[0]
        let y = center[1]
        coor.push(center)
        coor.push([x, y - 0.01])
        coor.push([x + 0.01, y - 0.01])
        coor.push([x + 0.01, y])
        // coor.push([x + 0.01, y])
        // coor.push([x + 0.015, y - 0.005])
        // coor.push([x + 0.005, y - 0.005])
        linedata.push({
          geometry: {
            type: 'Polygon',
            coordinates: [coor]
          },
          properties: {
            count: Math.round(Math.random() * 10) + 5
          }
        });
        var marker = new BMapGL.Marker({
          lng: center[0],
          lat: center[1],
        }) // 创建标注
       this.map.addOverlay(marker)
      })
      console.log(linedata);
      return linedata
    },
    location () {
      const bd1 = new BMapGL.Boundary();
      bd1.get('青岛市黄岛区', (rs) => {
        let count = rs.boundaries.length;
        for (let i = 0;i < count;i++) {
          let path = [];
          let str = rs.boundaries[i].replace(' ', '');
          let points = str.split(';');
          for (let j = 0;j < points.length;j++) {
            let lng = points[j].split(',')[0];
            let lat = points[j].split(',')[1];
            path.push(new BMapGL.Point(lng, lat));
          }
          //将点坐标练成直线
          this.map.addOverlay(new BMapGL.Polyline(path, { strokeColor: '#00BFDC', strokeWeight: 2, strokeOpacity: 0.5 })) 
          
          //地图类型
          let prism = new BMapGL.Prism(path, 5000, {
            topFillColor: '#5679ea',
            topFillOpacity: 0.1,
            sideFillColor: '#5679ea',
            sideFillOpacity: 0.9
          });
          this.map.addOverlay(prism);

          // 添加蒙版，只显示某个区域
          const xyArr = rs.boundaries[i].split(';')
          const ptArr = []
          for (let j = 0; j < xyArr.length; j++) {
            const tmp = xyArr[j].split(',')
            const pt = new BMapGL.Point(tmp[0], tmp[1])
            ptArr.push(pt)
          }
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
          // this.map.addOverlay(mapmask)
        }
      });
    }
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
  list-style: none;
}

.btn:hover {
  background-color: rgba(27, 142, 236, 0.8);
  color: #fff;
  cursor: pointer;
}</style>
</style>
