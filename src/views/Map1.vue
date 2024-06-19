<template>
  <div class="home">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import { lazyBMapApiLoaderInstance } from 'vue-bmap-gl'
import { nightStyle, darkStyle, snowStyle, blueStyle } from '@/plugins/common'

export default {
  data () {
    return {
      position_NKYYGS: {
        Name: '四川省农业科学院',
        address: '成都市锦江区静居寺路20号',
        phoneNumber: '(028)84504011',
        bdLNG: 116.297611,
        bdLAT: 40.047363,
      },
      map: '',
      pointList: [],
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
    baidu () {
      lazyBMapApiLoaderInstance.load().then(this.initMap())
    },
    // 3d地图
    initMap () {
      const map = new BMapGL.Map('map') // 创建Map实例
      // map.centerAndZoom(new BMapGL.Point(116.49252368042373, 38.909761458054575), 12)
      map.centerAndZoom(new BMapGL.Point(116.351427174328, 38.98319961891315), 17.20023167646539)
      map.enableScrollWheelZoom(true)
      // map.setHeading(10)
      // map.setTilt(53)
      map.setMapStyleV2({ styleJson: blueStyle })

      this.map = map

      // 监听事件
      this.map.addEventListener('click', e => {
          console.log('click', e.latlng, this.map.getZoom())
          this.pointList.push(e.latlng)
                var marker = new BMapGL.Marker(e.latlng) // 创建标注
      this.map.addOverlay(marker) //添加标注到地图
      // this.markerList.push(marker)
          console.log(this.pointList);
      })
      // this.setPointList()
      this.location()
      // this.getLocation()
    },
    getLocation(){
      //创建地址解析器实例
      const myGeo = new BMapGL.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint('河北省廊坊市文安县', point => {
          if(point){
              this.map.centerAndZoom(point, 16);
              // map.addOverlay(new BMapGL.Marker(point, {title: '北京市海淀区上地10街'}))
          }else{
              alert('您选择的地址没有解析到结果！');
          }
      }, '河北省')
    },
    createLine(pointList){
      if(pointList.length == 0)return
      // this.pointList.push(point)
      // var marker = new BMapGL.Marker(point) // 创建标注
      // this.map.addOverlay(marker) //添加标注到地图
      // this.markerList.push(marker)

      // this.polyline && this.map.removeOverlay(this.polyline)
      const polyline = new BMapGL.Polyline(pointList, { strokeColor: '#e36133', strokeWeight: 8, strokeOpacity: 0.6 })
      this.map.addOverlay(polyline)
    },
    location () {
      const bd1 = new BMapGL.Boundary();
      bd1.get('河北省廊坊市文安县', (rs) => {
        console.log(rs);
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
          this.map.addOverlay(new BMapGL.Polyline(path, { strokeColor: 'red', strokeWeight: 2, strokeOpacity: 0.5 }))

          this.setPointList()

          //地图类型
          let prism = new BMapGL.Prism(path, 5000, {
            topFillColor: '#5679ea',
            topFillOpacity: 0.1,
            sideFillColor: '#5679ea',
            sideFillOpacity: 0.9
          });
          // this.map.addOverlay(prism);

          // 添加蒙版，只显示某个区域
          const xyArr = rs.boundaries[i].split(';')
          const ptArr = []
          for (let j = 0;j < xyArr.length;j++) {
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

          // 添加蝌蚪线
          const data = [
            {
              geometry: {
                "type": "LineString",
                "coordinates": [
                  [
                    35.604498782015945,
                    119.76346907023886
                  ],
                  [
                    35.62175990915958,
                    119.76255006803783
                  ],
                  [
                    35.639767512896654,
                    119.76255006803783
                  ],
                  [
                    35.660191148230986,
                    119.76740135071596
                  ],
                  [
                    35.65681590505643,
                    119.76832035291697
                  ],
                  [
                    35.66506624536908,
                    119.75821132870581
                  ],
                  [
                    35.67893987795682,
                    119.75867082980633
                  ],
                  [
                    35.69768416421004,
                    119.75499482100227
                  ],
                  [
                    35.70105766376605,
                    119.74672380119314
                  ],
                  [
                    35.69805900460519,
                    119.74120978798705
                  ],
                  [
                    35.71604925277255,
                    119.737533779183
                  ],
                  [
                    35.725417551197594,
                    119.73891228248452
                  ],
                  [
                    35.742652316213,
                    119.74166928908755
                  ]
                ]
              }
            },
            {
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [
                    119.62744823814111,
                    35.609301922329934
                  ],
                  [
                    119.63980976595526,
                    35.61813479038989
                  ],
                  [
                    119.64629956805767,
                    35.62494804473588
                  ],
                  [
                    119.64599052986233,
                    35.62469571242709
                  ],
                  [
                    119.64382726249484,
                    35.6325176403776
                  ],
                  [
                    119.64290014790879,
                    35.640843360306704
                  ],
                  [
                    119.64969898820657,
                    35.64487975798926
                  ],
                  [
                    119.65897013406718,
                    35.645384293234095
                  ],
                  [
                    119.6753491584209,
                    35.642861584864114
                  ],
                  [
                    119.68245703691403,
                    35.642861584864114
                  ],
                  [
                    119.69945413765849,
                    35.645384293234095
                  ],
                  [
                    119.70903432171444,
                    35.649168205103514
                  ],
                  [
                    119.72077777313787,
                    35.654969852089344
                  ],
                  [
                    119.73283026275666,
                    35.66430204420751
                  ],
                  [
                    119.74271948500797,
                    35.67363313588894
                  ],
                  [
                    119.74797313432899,
                    35.684475994839104
                  ],
                  [
                    119.75631716560353,
                    35.691535661958646
                  ],
                  [
                    119.75477197462676,
                    35.69733420264865
                  ],
                  [
                    119.75539005101746,
                    35.710442378728374
                  ],
                  [
                    119.75569908921283,
                    35.72153221378153
                  ]
                ]
              }
            },
            {
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [
                    119.53185517655349,
                    35.650397803569035
                  ],
                  [
                    119.54494120872488,
                    35.65075384966249
                  ],
                  [
                    119.55628243660675,
                    35.65751842120402
                  ],
                  [
                    119.56195305054767,
                    35.6646383983122
                  ],
                  [
                    119.57678388700857,
                    35.66606231686605
                  ],
                  [
                    119.60513695671322,
                    35.67211368485212
                  ],
                  [
                    119.62040399424652,
                    35.67816458998092
                  ],
                  [
                    119.669258514353,
                    35.68528270926867
                  ],
                  [
                    119.67929113901772,
                    35.687062138978796
                  ],
                  [
                    119.70808040979476,
                    35.694179457347836
                  ],
                  [
                    119.7303266644861,
                    35.70236358128869
                  ],
                  [
                    119.74297649558511,
                    35.70983530209574
                  ],
                  [
                    119.75126431596031,
                    35.71517181292101
                  ],
                  [
                    119.76260554384218,
                    35.72121942267927
                  ]
                ]
              }
            },
            {
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [
                    119.53185517655349,
                    35.650397803569035
                  ],
                  [
                    119.54494120872488,
                    35.65075384966249
                  ],
                  [
                    119.55628243660675,
                    35.65751842120402
                  ],
                  [
                    119.56195305054767,
                    35.6646383983122
                  ],
                  [
                    119.57678388700857,
                    35.66606231686605
                  ],
                  [
                    119.60513695671322,
                    35.67211368485212
                  ],
                  [
                    119.62040399424652,
                    35.67816458998092
                  ],
                  [
                    119.669258514353,
                    35.68528270926867
                  ],
                  [
                    119.67929113901772,
                    35.687062138978796
                  ],
                  [
                    119.70808040979476,
                    35.694179457347836
                  ],
                  [
                    119.7303266644861,
                    35.70236358128869
                  ],
                  [
                    119.74297649558511,
                    35.70983530209574
                  ],
                  [
                    119.75126431596031,
                    35.71517181292101
                  ],
                  [
                    119.76260554384218,
                    35.72121942267927
                  ]
                ]
              }
            }

          ]
          var view = new mapvgl.View({
            map: this.map
          });
          var lineLayer = new mapvgl.LineLayer({
            color: 'rgba(255, 71, 26, 0.9)',
            width: 4,
            animation: true,
            duration: 1, // 循环时间2s
            trailLength: 0.6, // 拖尾长度占间隔的0.4
            interval: 0.2 // 粒子长度占线整体长度的0.2
          });
          // view.addLayer(lineLayer);
          // lineLayer.setData(data);
        }
      });
    },
    setPointList(){
      const pointList = [
    {
        "lng": 116.3416386177508,
        "lat": 38.986611616945176
    },
    {
        "lng": 116.34679262725487,
        "lat": 38.98515592732377
    },
    {
        "lng": 116.34615088288083,
        "lat": 38.98371586058453
    },
    {
        "lng": 116.34705333590684,
        "lat": 38.98338714555832
    },
    {
        "lng": 116.34615088288083,
        "lat": 38.98135220876764
    },
    {
        "lng": 116.35216723638752,
        "lat": 38.9803190644438
    },
    {
        "lng": 116.36024920459819,
        "lat": 38.97981814051262
    },
    {
        "lng": 116.36163296590473,
        "lat": 38.986689878973145
    },
    {
        "lng": 116.35611797519026,
        "lat": 38.987456842230834
    },
    {
        "lng": 116.35242794503948,
        "lat": 38.985641160550855
    },
    {
        "lng": 116.34681268176655,
        "lat": 38.98509331634053
    }
]

      this.createLine(pointList)


      const lines = [
    {
        "lng": 116.35301926370825,
        "lat": 38.98556689999113
    },
    {
        "lng": 116.35544344319106,
        "lat": 38.985446979054316
    },
    {
        "lng": 116.35509347361783,
        "lat": 38.98197584540345
    },
    {
        "lng": 116.35231078871854,
        "lat": 38.98202914625761
    },
    {
      "lng": 116.35301926370825,
        "lat": 38.98556689999113
    }
]
      this.createLine(lines)

      const lines2 = [
    {
        "lng": 116.35544052399648,
        "lat": 38.98545000853311
    },
    {
        "lng": 116.35714965634321,
        "lat": 38.985315326861425
    },
    {
        "lng": 116.3567388072214,
        "lat": 38.981903305010306
    },
    {
        "lng": 116.3550871937517,
        "lat": 38.981986683460285
    }
]

this.createLine(lines2)

const lines3 = [
    {
        "lng": 116.3571431745133,
        "lat": 38.985321614537845
    },
    {
        "lng": 116.35861357555696,
        "lat": 38.985226504576964
    },
    {
        "lng": 116.35836745793696,
        "lat": 38.98183613009586
    },
    {
        "lng": 116.3567388072214,
        "lat": 38.981903305010306
    },
]
this.createLine(lines3)

const lines4 = [
    {
        "lng": 116.35860755865389,
        "lat": 38.98523104816054
    },
    {
        "lng": 116.36130407439786,
        "lat": 38.985108516818045
    },
    {
        "lng": 116.36062994546187,
        "lat": 38.98174242514651
    },
    {
        "lng": 116.35836745793696,
        "lat": 38.98183613009586
    }
]
this.createLine(lines4)



const lines5 = [
{
        "lng": 116.35231078871854,
        "lat": 38.98202914625761
    },

    {
    "lng": 116.35216560602824,
    "lat": 38.98027291425434
}
]
this.createLine(lines5)
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
}

.btn:hover {
  background-color: rgba(27, 142, 236, 0.8);
  color: #fff;
  cursor: pointer;
}
</style>
</style>
