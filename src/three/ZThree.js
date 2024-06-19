import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';

export default class ZThree {
    constructor(id){
        this.id = id
        this.el = document.getElementById(this.id)
    }

    // 初始化
    initThree() {
        const width = this.el.offsetWidth
        const height = this.el.offsetHeight
        this.scene = new THREE.Scene()
        this.textureLoader = new THREE.TextureLoader()
        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
        this.camera.position.set(0, 0, 50)
        // 设置相机看的位置
        this.camera.lookAt(0, 0, 0)
        this.renderer = new THREE.WebGL1Renderer({
            antialias: true,
            alpha: true
        })

        // 渲染器
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(width, height)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        
        this.el.append(this.renderer.domElement)

        this.gui = new GUI()

        window.addEventListener('resize', () => {
            this.camera.aspect = this.el.offsetWidth / this.el.offsetHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)
            if(this.cssRenderer) {
                this.cssRenderer.setSize(this.el.offsetWidth, this.offsetHeight)
            }
        })
    }

    // 控制器
    initOrbitControls() {
        let controls = new OrbitControls(this.camera, this.renderer.domElement)
        controls.listenToKeyEvents( window )
        controls.enableZoom = true
        controls.autoRotate = false
        controls.autoRotateSpeed = 0.5
        controls.enablePan = true

        this.controls = controls
    }

    // 灯光
    initLight() {
        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        // directionalLight.color.setHSL(0 , 1, 0);
        directionalLight.position.set(-100, 100, -100 );
        // directionalLight.position.multiplyScalar( 5 );
        directionalLight.castShadow = true
        this.scene.add( directionalLight );

        directionalLight.shadow.mapSize.width = 512;
        directionalLight.shadow.mapSize.height = 512;

        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.near = 0.5;

        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.bias = 0.05;
        directionalLight.shadow.normalBias = 0.05;

        const dirLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
		this.scene.add( dirLightHelper );

        const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
        this.scene.add( helper );
    }
    
    // 加载模型
    loadModel() {
        // switch(option.type){
        //     case 'glb':
        //     case 'gltf':
        //         if(!this.gltfLoader) {
        //             this.gltfLoader = new GLTFLoader()
        //             let dracoLoader = new DRACOLoader()
        //             dracoLoader.setDecoderPath('draco/')
        //             this.gltfLoader.setDecoLoader(dracoLoader)
        //         }
        //         this.gltfLoader.load(option.url, option.onLoad, option.onProgress, option.onError)
        //         break;
        // }
        const loader = new GLTFLoader();

        loader.load( 'model/model.glb',  gltf => {
          this.scene.add( gltf.scene );    

          this.model = gltf.scene
          const receiveModel = ['平面017_1', '平面017_2', '平面017_3', '平面017_4']
          this.model.traverse( obj => {
             if( receiveModel.includes( obj.name)) {
                obj.receiveShadow = true
             } else {
                obj.castShadow = true
                obj.receiveShadow = false
             }
          })
        }, undefined, error => {       
            console.error( error );      
        } );
    }
    initHelper() {
        this.scene.add(new THREE.AxesHelper(100))
    }

    render(callback) {
        callback()
        this.frameId = requestAnimationFrame(() => this.render(callback))
    }
}