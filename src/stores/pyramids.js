import { markRaw } from 'vue';
import { defineStore } from 'pinia'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import {
  AmbientLight,
  BufferGeometry,
  Color,
  CylinderBufferGeometry,
  DirectionalLight,
  FogExp2,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';

export const usePyramidsStore = defineStore('scene', {
  state: () => {
    return {
      width: 0,
      height: 0,
      camera: null,
      controls: null,
      scene: null,
      renderer: null,
      axisLines: [],
      pyramids: []
    }
  },
  getters: {
    CAMERA_POSITION: (state) => {
      return state.camera ? state.camera.position : null;
    }
  },
  actions: {
    SET_VIEWPORT_SIZE(width, height) {
      this.width = width;
      this.height = height;
    },
    INITIALIZE_RENDERER(el) {
      const renderer = new WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.width, this.height);
      el.appendChild(renderer.domElement);

      this.renderer = markRaw(renderer);
    },
    INITIALIZE_CAMERA() {
      const camera = new PerspectiveCamera(
        // 1. Field of View (degrees)
        60,
        // 2. Aspect ratio
        this.width / this.height,
        // 3. Near clipping plane
        1,
        // 4. Far clipping plane
        1000
      );
      camera.position.z = 500;

      this.camera = camera
    },
    INITIALIZE_CONTROLS() {
      const controls = new TrackballControls(
        this.camera,
        this.renderer.domElement
      );
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.3;
      controls.keys = [65, 83, 68];

      this.controls = markRaw(controls)
    },
    UPDATE_CONTROLS() {
      this.controls.update();
    },
    INITIALIZE_SCENE() {
      const scene = new Scene();
      scene.background = markRaw(new Color(0xcccccc));
      scene.fog = markRaw(new FogExp2(0xcccccc, 0.002));

      // Pyramids
      this.pyramids = [];
      var pyramidGeometry = new CylinderBufferGeometry(0, 10, 30, 4, 1);
      var pyramidMaterial = new MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      });
      for (var i = 0; i < 500; i++) {
        var mesh = new Mesh(pyramidGeometry, pyramidMaterial);
        mesh.position.x = (Math.random() - 0.5) * 1000;
        mesh.position.y = (Math.random() - 0.5) * 1000;
        mesh.position.z = (Math.random() - 0.5) * 1000;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        this.pyramids.push(markRaw(mesh));
      }
      scene.add(...this.pyramids);

      // lights
      var lightA = new DirectionalLight(0xffffff);
      lightA.position.set(1, 1, 1);
      scene.add(markRaw(lightA));
      var lightB = new DirectionalLight(0x002288);
      lightB.position.set(-1, -1, -1);
      scene.add(markRaw(lightB));
      var lightC = new AmbientLight(0x222222);
      scene.add(markRaw(lightC));

      // Axis Line 1
      const axisLine1Material = new LineBasicMaterial({ color: 0x0000ff });
      const axisLine1Points = [];
      axisLine1Points.push(new Vector3(0, 0, 0));
      axisLine1Points.push(new Vector3(0, 1000, 0));
      let axisLine1Geometry = new BufferGeometry().setFromPoints(axisLine1Points);
      let axisLine1 = new Line(axisLine1Geometry, axisLine1Material)
      this.axisLines.push(markRaw(axisLine1));

      // Axis Line 2
      const axisLine2Material = new LineBasicMaterial({ color: 0x00ff00 });
      const axisLine2Points = [];
      axisLine2Points.push(new Vector3(0, 0, 0));
      axisLine2Points.push(new Vector3(1000, 0, 0));
      let axisLine2Geometry = new BufferGeometry().setFromPoints(axisLine2Points);
      let axisLine2 = new Line(axisLine2Geometry, axisLine2Material);
      this.axisLines.push(markRaw(axisLine2));

      // Axis 3
      const axisLine3Material = new LineBasicMaterial({ color: 0xff0000 });
      const axisLine3Points = [];
      axisLine3Points.push(new Vector3(0, 0, 0));
      axisLine3Points.push(new Vector3(0, 0, 1000));
      let axisLine3Geometry = new BufferGeometry().setFromPoints(axisLine3Points);
      let axisLine3 = new Line(axisLine3Geometry, axisLine3Material);
      this.axisLines.push(markRaw(axisLine3));

      scene.add(...this.axisLines);
      this.scene = markRaw(scene)
    },
    RESIZE(width, height) {
      this.width = width;
      this.height = height;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.controls.handleResize();
      this.RENDER();
    },
    SET_CAMERA_POSITION(x, y, z) {
      if (this.camera) {
        this.camera.position.set(x, y, z);
      }
    },
    RESET_CAMERA_ROTATION() {
      if (this.camera) {
        this.camera.rotation.set(0, 0, 0);
        this.camera.quaternion.set(0, 0, 0, 1);
        this.camera.up.set(0, 1, 0);
        this.controls.target.set(0, 0, 0);
      }
    },
    HIDE_AXIS_LINES() {
      this.scene.remove(...this.axisLines);
      this.RENDER();
    },
    SHOW_AXIS_LINES() {
      this.scene.add(...this.axisLines);
      this.RENDER();
    },
    HIDE_PYRAMIDS() {
      this.scene.remove(...this.pyramids);
      this.RENDER();
    },
    SHOW_PYRAMIDS() {
      this.scene.add(...this.pyramids);
      this.RENDER();
    },
    INIT(width, height, el) {
      return new Promise(resolve => {
        this.SET_VIEWPORT_SIZE(width, height);
        this.INITIALIZE_RENDERER(el);
        this.INITIALIZE_CAMERA();
        this.INITIALIZE_CONTROLS();
        this.INITIALIZE_SCENE();

        // Initial scene rendering
        this.RENDER();

        // Add an event listener that will re-render
        // the scene when the controls are changed
        this.controls.addEventListener("change", () => {
          this.RENDER();
        });

        resolve();
      });
    },
    RENDER() {

      this.renderer.render(this.scene, this.camera);
    },
    ANIMATE() {
      window.requestAnimationFrame(() => {
        this.ANIMATE();
        this.controls.update();
      });
    }
  }
});
