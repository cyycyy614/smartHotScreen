/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const ak = 'I0FaaX4udb8zDI314lq9Ipk4GR9F2wtH'
export function loadBaiDuMap() {
  return new Promise((resolve, reject) => {
    window.init = () => {
      // eslint-disable-next-line
      resolve(BMapGL);
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `http://api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback=init`;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function loadBaiDuDrawMap() {
  return loadBaiDuMap().then(BMapGL => {
    let loaded = false
    try {
      // eslint-disable-next-line no-undef
      loaded = (BMapGLLib && BMapGLLib.DrawingManager)
    } catch (err) {
      loaded = false
    }
    if (!loaded) {
      console.log('BMapLib.DrawingManager loading!')
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js'
      document.body.appendChild(script)
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css'
      document.body.appendChild(link)
    } else {
      console.log('BMapLib.DrawingManager is loaded!')
    }
    return BMapGL
  })
}

export function loadMapVP() {
  return loadBaiDuMap().then(BMapGL => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://unpkg.com/mapvgl/dist/mapvgl.min.js'
    document.head.appendChild(script)
    return BMapGL
  })
}
