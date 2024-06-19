<!-- eslint-disable no-unused-vars -->
<template>
    <div class="main">
        <div id="screen" class="screen"></div>
    </div>
</template>

<script>
import ZThree from '@/three/ZThree'
import * as THREE from 'three'

let app = {}, camera, scene, renderer, controls, clock
export default {
    name: 'ThreeView',
    methods: {
        async initThree() {
           app = new ZThree('screen')
           app.initThree()
           app.initHelper()
           app.initOrbitControls()
           app.initLight()

           clock = new THREE.Clock()
           renderer = app.renderer
           scene = app.scene
           camera = app.camera
           controls = app.controls
           console.log(app)

        //    this.addBoxGeometry(scene)
           app.loadModel()

           app.render(() => {
              const delta = clock.getDelta()
              controls.update(delta)
              renderer.render(scene, camera)
           })
        },
        addBoxGeometry(scene) {
            const geometry = new THREE.BoxGeometry( 5, 5, 5 );
            const material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
            const cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
        }
    },
    mounted () {
        this.initThree();
    },
}
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100vh;
    background: #000000;
    overflow: hidden;
  }
  .screen {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
</style>