import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  FogExp2,
  CylinderGeometry,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight,
  AmbientLight,
  LineBasicMaterial,
  BufferGeometry,
  Vector3,
  Line,
  Float32BufferAttribute
} from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'

export const useThreeStore = defineStore('three', {
  state: () => ({
    width: 0,
    height: 0,
    camera: null,
    controls: null,
    scene: null,
    renderer: null,
    axisLines: [],
    pyramids: []
  }),

  getters: {
    cameraPosition: (state) => {
      return state.camera ? state.camera.position : null
    }
  },

  actions: {
    setViewportSize({ width, height }) {
      this.width = width
      this.height = height
    },

    initializeRenderer(el) {
      this.renderer = markRaw(new WebGLRenderer({ antialias: true }))
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.width, this.height)
      el.appendChild(this.renderer.domElement)
    },

    initializeCamera() {
      this.camera = markRaw(new PerspectiveCamera(
        // 1. Field of View (degrees)
        60,
        // 2. Aspect ratio
        this.width / this.height,
        // 3. Near clipping plane
        1,
        // 4. Far clipping plane
        1000
      ))
      this.camera.position.z = 500
    },

    initializeControls() {
      this.controls = markRaw(new TrackballControls(
        this.camera,
        this.renderer.domElement
      ))
      this.controls.rotateSpeed = 1.0
      this.controls.zoomSpeed = 1.2
      this.controls.panSpeed = 0.8
      this.controls.noZoom = false
      this.controls.noPan = false
      this.controls.staticMoving = true
      this.controls.dynamicDampingFactor = 0.3
      this.controls.keys = [65, 83, 68]
    },

    updateControls() {
      this.controls.update()
    },

    initializeScene() {
      this.scene = markRaw(new Scene())
      this.scene.background = new Color(0xcccccc)
      this.scene.fog = new FogExp2(0xcccccc, 0.002)

      var geometry = markRaw(new CylinderGeometry(0, 10, 30, 4, 1))
      var material = markRaw(new MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      }))

      for (var i = 0; i < 500; i++) {
        var mesh = markRaw(new Mesh(geometry, material))
        mesh.position.x = (Math.random() - 0.5) * 1000
        mesh.position.y = (Math.random() - 0.5) * 1000
        mesh.position.z = (Math.random() - 0.5) * 1000
        mesh.updateMatrix()
        mesh.matrixAutoUpdate = false
        this.pyramids.push(mesh)
      }
      this.scene.add(...this.pyramids)

      // lights
      var lightA = markRaw(new DirectionalLight(0xffffff))
      lightA.position.set(1, 1, 1)
      this.scene.add(lightA)

      var lightB = markRaw(new DirectionalLight(0x002288))
      lightB.position.set(-1, -1, -1)
      this.scene.add(lightB)

      var lightC = markRaw(new AmbientLight(0x222222))
      this.scene.add(lightC)

      // Axis Line 1 (Y-axis - Blue)
      var materialB = markRaw(new LineBasicMaterial({ color: 0x0000ff }))
      var geometryB = markRaw(new BufferGeometry())
      const pointsB = [
        new Vector3(0, 0, 0),
        new Vector3(0, 1000, 0)
      ]
      geometryB.setFromPoints(pointsB)
      var lineA = markRaw(new Line(geometryB, materialB))
      this.axisLines.push(lineA)

      // Axis Line 2 (X-axis - Green)
      var materialC = markRaw(new LineBasicMaterial({ color: 0x00ff00 }))
      var geometryC = markRaw(new BufferGeometry())
      const pointsC = [
        new Vector3(0, 0, 0),
        new Vector3(1000, 0, 0)
      ]
      geometryC.setFromPoints(pointsC)
      var lineB = markRaw(new Line(geometryC, materialC))
      this.axisLines.push(lineB)

      // Axis Line 3 (Z-axis - Red)
      var materialD = markRaw(new LineBasicMaterial({ color: 0xff0000 }))
      var geometryD = markRaw(new BufferGeometry())
      const pointsD = [
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 1000)
      ]
      geometryD.setFromPoints(pointsD)
      var lineC = markRaw(new Line(geometryD, materialD))
      this.axisLines.push(lineC)

      this.scene.add(...this.axisLines)
    },

    resize({ width, height }) {
      this.width = width
      this.height = height
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
      this.controls.handleResize()
      this.renderer.render(this.scene, this.camera)
    },

    setCameraPosition({ x, y, z }) {
      if (this.camera) {
        this.camera.position.set(x, y, z)
      }
    },

    resetCameraRotation() {
      if (this.camera) {
        this.camera.rotation.set(0, 0, 0)
        this.camera.quaternion.set(0, 0, 0, 1)
        this.camera.up.set(0, 1, 0)
        this.controls.target.set(0, 0, 0)
      }
    },

    hideAxisLines() {
      this.scene.remove(...this.axisLines)
      this.renderer.render(this.scene, this.camera)
    },

    showAxisLines() {
      this.scene.add(...this.axisLines)
      this.renderer.render(this.scene, this.camera)
    },

    hidePyramids() {
      this.scene.remove(...this.pyramids)
      this.renderer.render(this.scene, this.camera)
    },

    showPyramids() {
      this.scene.add(...this.pyramids)
      this.renderer.render(this.scene, this.camera)
    },

    async init({ width, height, el }) {
      this.setViewportSize({ width, height })
      this.initializeRenderer(el)
      this.initializeCamera()
      this.initializeControls()
      this.initializeScene()

      // Initial scene rendering
      this.renderer.render(this.scene, this.camera)

      // Add an event listener that will re-render
      // the scene when the controls are changed
      this.controls.addEventListener('change', () => {
        this.renderer.render(this.scene, this.camera)
      })
    },

    animate() {
      window.requestAnimationFrame(() => {
        this.animate()
        this.controls.update()
      })
    }
  }
})
