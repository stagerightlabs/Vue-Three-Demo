<template>
  <div
    class="flex flex-col absolute w-64 h-auto pin-r pin-b bg-grey-darkest text-white rounded mr-2 mb-2 z-10"
  >
    <div class="p-2 mt-1">Controls</div>
    <div
      class="bg-grey-dark h-full p-3 rounded-b flex flex-col border border-grey-darkest"
    >
      <div class="border-b border-grey-darkest mb-2 pb-2">
        <p class="mb-1 text-grey-light font-bold">Scenery</p>
        <p class="flex items-center justify-between mb-1">
          Pyramids
          <input
            type="checkbox"
            name="pyramids"
            id="pyramids"
            v-model="pyramidsVisible"
            @click="togglePyramids"
          />
        </p>
        <p class="flex items-center justify-between">
          Axis Lines
          <input
            type="checkbox"
            name="axis-lines"
            id="axis-lines"
            v-model="axisLinesVisible"
            @click="toggleAxisLines"
          />
        </p>
      </div>
      <div
        v-if="store.cameraPosition"
        class="border-b border-grey-darkest mb-2 pb-2"
      >
        <p class="mb-1 text-grey-light font-bold">Camera Position</p>
        <p class="flex justify-between w-full mb-2 text-grey-light">
          X:<span class="text-white">{{ store.cameraPosition.x }}</span>
        </p>
        <p class="flex justify-between w-full mb-2 text-grey-light">
          Y:<span class="text-white">{{ store.cameraPosition.y }}</span>
        </p>
        <p class="flex justify-between w-full mb-2 text-grey-light">
          Z:<span class="text-white">{{ store.cameraPosition.z }}</span>
        </p>
        <p class="flex items-center">
          <button
            class="bg-grey-light cursor-pointer shadow p-2 mx-auto"
            @click="resetCameraPosition"
          >
            Reset Camera
          </button>
        </p>
      </div>
      <div class="flex justify-around">
        <a
          href="https://threejs.org/examples/?q=controls#misc_controls_trackball"
          target="_blank"
          class="text-grey-light no-underline hover:text-grey-lighter"
          >Original &#8599;
        </a>
        <a
          href="https://github.com/SRLabs/Vue-Three-Demo"
          target="_blank"
          class="text-grey-light no-underline hover:text-grey-lighter"
          >Github &#8599;
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useThreeStore } from "@/store";

export default {
  setup() {
    const store = useThreeStore();
    return { store };
  },
  data() {
    return {
      axisLinesVisible: true,
      pyramidsVisible: true,
    };
  },
  methods: {
    resetCameraPosition() {
      this.store.setCameraPosition({ x: 0, y: 0, z: 500 });
      this.store.resetCameraRotation();
    },
    toggleAxisLines() {
      if (this.axisLinesVisible) {
        this.store.hideAxisLines();
        this.axisLinesVisible = false;
      } else {
        this.store.showAxisLines();
        this.axisLinesVisible = true;
      }
    },
    togglePyramids() {
      if (this.pyramidsVisible) {
        this.store.hidePyramids();
        this.pyramidsVisible = false;
      } else {
        this.store.showPyramids();
        this.pyramidsVisible = true;
      }
    },
  },
};
</script>
