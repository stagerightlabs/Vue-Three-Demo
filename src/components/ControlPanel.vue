<template>
  <div
    class="flex flex-col absolute w-64 h-auto pin-r pin-b bg-grey-darkest text-white rounded mr-2 mb-2 z-10"
  >
    <div class="p-2 mt-1">
      Controls
    </div>
    <div
      class="bg-grey-dark h-full p-3 rounded-b flex flex-col border border-grey-darkest"
    >
      <div class="border-b border-grey-darkest mb-2 pb-2">
        <p class="mb-1 text-grey-light font-bold">
          Scenery
        </p>
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
        v-if="CAMERA_POSITION"
        class="border-b border-grey-darkest mb-2 pb-2"
      >
        <p class="mb-1 text-grey-light font-bold">
          Camera Position
        </p>
        <p class="flex justify-between w-full mb-2 text-grey-light">
          X:<span class="text-white">{{ CAMERA_POSITION.x }}</span>
        </p>
        <p class="flex justify-between w-full mb-2 text-grey-light">
          Y:<span class="text-white">{{ CAMERA_POSITION.y }}</span>
        </p>
        <p class="flex justify-between w-full mb-2 text-grey-light">
          Z:<span class="text-white">{{ CAMERA_POSITION.z }}</span>
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
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      axisLinesVisible: true,
      pyramidsVisible: true
    };
  },
  computed: {
    ...mapGetters(["CAMERA_POSITION"])
  },
  methods: {
    ...mapMutations([
      "SET_CAMERA_POSITION",
      "RESET_CAMERA_ROTATION",
      "HIDE_AXIS_LINES",
      "SHOW_AXIS_LINES",
      "HIDE_PYRAMIDS",
      "SHOW_PYRAMIDS"
    ]),
    resetCameraPosition() {
      this.SET_CAMERA_POSITION({ x: 0, y: 0, z: 500 });
      this.RESET_CAMERA_ROTATION();
    },
    toggleAxisLines() {
      if (this.axisLinesVisible) {
        this.HIDE_AXIS_LINES();
        this.axisLinesVisible = false;
      } else {
        this.SHOW_AXIS_LINES();
        this.axisLinesVisible = true;
      }
    },
    togglePyramids() {
      if (this.pyramidsVisible) {
        this.HIDE_PYRAMIDS();
        this.pyramidsVisible = false;
      } else {
        this.SHOW_PYRAMIDS();
        this.pyramidsVisible = true;
      }
    }
  }
};
</script>
