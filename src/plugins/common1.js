/**
 * 初始化地图
 */

/* global BMapGL */
/* global darkStyle */

export function initMap(options) {
  options = Object.assign(
    {
      tilt: 60,
      heading: 0,
    },
    options
  )
  var map = new BMapGL.Map('map_container', {
    restrictCenter: false,
    style: { styleJson: options.style || darkStyle },
  })
  map.enableKeyboard()
  map.enableScrollWheelZoom()
  map.enableInertialDragging()
  map.enableContinuousZoom()

  map.setDisplayOptions(
    options.displayOptions || {
      indoor: false,
      poi: true,
      skyColors: options.skyColors || ['rgba(5, 5, 30, 0.01)', 'rgba(5, 5, 30, 1.0)'],
    }
  )
  if (options.center && options.zoom) {
    let center = options.center
    if (center instanceof Array) {
      center = new BMapGL.Point(options.center[0], options.center[1])
    }
    map.centerAndZoom(center, options.zoom)
  }

  map.setTilt(options.tilt)
  map.setHeading(options.heading)
  return map
}
const roadColor = 'transparent'
export const nightStyle = [
  {
    featureType: 'land',
    elementType: 'geometry',
    stylers: {
      // "color": "#45341Aff"
      color: '#242f3eff',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'geometry',
    stylers: {
      // "color": "#45341Aff"
      color: '#000000ff',
    },
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: {
      color: '#474340ff',
      // "color": "#17263cff"
    },
  },
  {
    featureType: 'scenicspots',
    elementType: 'geometry',
    stylers: {
      color: '#474340ff',
      visibility: 'on',
    },
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#bababaff',
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
      weight: 1,
    },
  },
  {
    featureType: 'poilabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'poilabel',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
      weight: 1,
    },
  },
  {
    featureType: 'subway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'railway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'poilabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'subwaylabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'subwaylabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'tertiarywaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'tertiarywaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'provincialwaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'provincialwaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highwaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highwaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'green',
    elementType: 'geometry',
    stylers: {
      color: '#474340ff',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'local',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'local',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor, //"#38414eff"
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'labels.text.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'labels.text.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry.fill',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry.stroke',
    stylers: {
      color: roadColor,
    },
  },
  {
    featureType: 'medicallabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'medicallabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'entertainmentlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'entertainmentlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'estatelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'on',
    },
  },
  {
    featureType: 'estatelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'on',
    },
  },
  {
    featureType: 'estatelabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#bababaff',
    },
  },
  {
    featureType: 'youdlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'businesstowerlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'companylabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'companylabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'governmentlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'governmentlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'restaurantlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'restaurantlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'hotellabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'hotellabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'shoppinglabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'shoppinglabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'lifeservicelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'lifeservicelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'carservicelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'carservicelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'financelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'financelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'otherlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'otherlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'provincialway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '8',
    },
  },
  {
    featureType: 'provincialway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '9',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '8',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '9',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '8',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'arterial',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '9',
    },
  },
  {
    featureType: 'arterial',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '10',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '9',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '10',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '9',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '10',
    },
  },
  {
    featureType: 'building',
    elementType: 'geometry.topfill',
    stylers: {
      // "color": "#2a3341ff"
      // "color": "#474340ff"
      color: '#39290fff',
    },
  },
  {
    featureType: 'building',
    elementType: 'geometry.sidefill',
    stylers: {
      // "color": "#313b4cff"
      // "color": "#45341Aff"
      color: '#6a573dff',
    },
  },
  {
    featureType: 'building',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#1a212eff',
    },
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'local',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'labels.text.fill',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
  {
    featureType: 'subwaystation',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'transportationlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'transportationlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'estate',
    elementType: 'geometry',
    stylers: {
      color: '#2a3341ff',
    },
  },
  {
    featureType: 'island',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#BC8011ff',
    },
  },
  {
    featureType: 'island',
    elementType: 'labels.text.stroke',
    stylers: {
      color: 'transparent',
    },
  },
]

export const blueStyle = [
  {
    featureType: 'land',
    elementType: 'geometry',
    stylers: {
      color: '#082554ff',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'geometry',
    stylers: {
      color: '#242f3eff',
    },
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: {
      color: '#6d9de4ff',
    },
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: {
      color: '#9e7d60ff',
    },
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#554631ff',
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'districtlabel',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#17263cff',
      weight: 0,
      opacity: '00',
    },
  },
  {
    featureType: 'poilabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'poilabel',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#17263cff',
      weight: 3,
    },
  },
  {
    featureType: 'subway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'railway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'poilabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'subwaylabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'subwaylabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'tertiarywaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'tertiarywaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'provincialwaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'provincialwaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highwaysign',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highwaysign',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'green',
    elementType: 'geometry',
    stylers: {
      color: '#082554ff',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#d0021bff',
    },
  },
  {
    featureType: 'nationalwaysign',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#ffffffff',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels',
    stylers: {
      visibility: 'on',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'city',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#17263cff',
    },
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#d69563ff',
    },
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#242f3eff',
    },
  },
  {
    featureType: 'local',
    elementType: 'geometry.fill',
    stylers: {
      color: '#38414eff',
    },
  },
  {
    featureType: 'local',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#ffffff00',
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'geometry.fill',
    stylers: {
      color: '#38414eff',
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#ffffff00',
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'geometry.fill',
    stylers: {
      color: '#7cc8ddff',
      opacity: '61',
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#ffffff00',
      opacity: '3b',
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
      weight: 40,
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry.fill',
    stylers: {
      color: '#9e7d60ff',
      opacity: 'b8',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#554631ff',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry.fill',
    stylers: {
      color: '#9e7d60ff',
      opacity: '57',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#554631ff',
    },
  },
  {
    featureType: 'tertiaryway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#e9ece9ff',
      opacity: '00',
      weight: 0,
    },
  },
  {
    featureType: 'fourlevelway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#dedfdeff',
      weight: 0,
      opacity: '08',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#1a2e1cff',
      opacity: '00',
      weight: 0,
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#dedfdeff',
      weight: 0,
      opacity: '00',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry.fill',
    stylers: {
      color: '#9e7d60ff',
      opacity: '57',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#554631ff',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry.fill',
    stylers: {
      color: '#9e7d60ff',
      opacity: '61',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#554631ff',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry.fill',
    stylers: {
      color: '#9e7d60ff',
      opacity: '73',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#554631fa',
    },
  },
  {
    featureType: 'medicallabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'medicallabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'entertainmentlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'entertainmentlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'estatelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'estatelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'businesstowerlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'businesstowerlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'companylabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'companylabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'governmentlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'governmentlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'restaurantlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'restaurantlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'hotellabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'hotellabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'shoppinglabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'shoppinglabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'lifeservicelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'lifeservicelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'carservicelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'carservicelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'financelabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'financelabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'otherlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'otherlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'on',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#d69563ff',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#17263cff',
    },
  },
  {
    featureType: 'airportlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'highway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'highway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'nationalway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'nationalway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'provincialway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '8',
    },
  },
  {
    featureType: 'provincialway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '9',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '8',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '9',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '8',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '8,9',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '6',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '7',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '8',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '9',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '6,10',
      level: '10',
    },
  },
  {
    featureType: 'arterial',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '9',
    },
  },
  {
    featureType: 'arterial',
    stylers: {
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '10',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '9',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '10',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '9',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
      curZoomRegionId: '0',
      curZoomRegion: '9,10',
      level: '10',
    },
  },
  {
    featureType: 'building',
    elementType: 'geometry.topfill',
    stylers: {
      color: '#2a3341ff',
    },
  },
  {
    featureType: 'building',
    elementType: 'geometry.sidefill',
    stylers: {
      color: '#313b4cff',
    },
  },
  {
    featureType: 'building',
    elementType: 'geometry.stroke',
    stylers: {
      color: '#1a212eff',
    },
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#e6f0e7ff',
    },
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#dfe6dfff',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#1a2e1cff',
      opacity: '00',
      weight: 1,
    },
  },
  {
    featureType: 'cityhighway',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#dedfdeff',
      weight: 0,
      opacity: '00',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#dedfdeff',
      opacity: '00',
      weight: 0,
    },
  },
  {
    featureType: 'local',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#17263cff',
    },
  },
  {
    featureType: 'subwaystation',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'transportationlabel',
    elementType: 'labels.icon',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'transportationlabel',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'estate',
    elementType: 'geometry',
    stylers: {
      color: '#2a3341ff',
    },
  },
  {
    featureType: 'highway',
    elementType: 'labels',
    stylers: {
      visibility: 'on',
    },
  },
  {
    featureType: 'provincialway',
    elementType: 'labels',
    stylers: {
      visibility: 'on',
    },
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'education',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'medical',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'district',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'town',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'village',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
  {
    featureType: 'island',
    elementType: 'labels.text.fill',
    stylers: {
      color: '#dedfdeff',
    },
  },
]
