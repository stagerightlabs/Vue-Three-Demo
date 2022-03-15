<script setup>
import { usePyramidsStore } from '@/stores/pyramids'

const store = usePyramidsStore();
let axisLinesVisible = true;
let pyramidsVisible = true;

function togglePyramids() {
  if (pyramidsVisible) {
    store.HIDE_PYRAMIDS();
    pyramidsVisible = false;
  } else {
    store.SHOW_PYRAMIDS();
    pyramidsVisible = true;
  }
}

function toggleAxisLines() {
  if (axisLinesVisible) {
    store.HIDE_AXIS_LINES();
    axisLinesVisible = false;
  } else {
    store.SHOW_AXIS_LINES();
    axisLinesVisible = true;
  }
}

function resetCameraPosition() {
  store.SET_CAMERA_POSITION(0, 0, 500);
  store.RESET_CAMERA_ROTATION();
}
</script>

<template>
  <div
    class="flex flex-col absolute w-64 h-auto text-white rounded-md mr-2 mb-2 z-10 border border-gray-700 bottom-0 right-0"
  >
    <div class="p-2 border-b border-gray-700 bg-gray-400">
      Controls
    </div>
    <div class=" h-full rounded-b flex flex-col bg-white">
      <!-- Toggles -->
      <div class="border-b border-gray-700 p-2">
        <p class="mb-1 text-gray-600 font-bold">
          Scenery
        </p>
        <p class="flex items-center justify-between text-gray-500">
          Pyramids
          <input
            type="checkbox"
            name="pyramids"
            id="pyramids"
            v-model="pyramidsVisible"
            @click="togglePyramids"
          />
        </p>
        <p class="flex items-center justify-between text-gray-500">
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
      <!-- Camera Position -->
      <div
        v-if="store.CAMERA_POSITION"
        class="p-2 border-b border-gray-700"
      >
        <p class="mb-1 text-gray-600 font-bold">
          Camera Position
        </p>
        <p class="flex justify-between w-full mb-2 text-gray-500">
          X: <span>{{ store.CAMERA_POSITION.x }}</span>
        </p>
        <p class="flex justify-between w-full mb-2 text-gray-500">
          Y: <span>{{ store.CAMERA_POSITION.y }}</span>
        </p>
        <p class="flex justify-between w-full mb-2 text-gray-500">
          Z: <span>{{ store.CAMERA_POSITION.z }}</span>
        </p>
        <p class="flex items-center">
          <button
            class="bg-gray-300 text-gray-600 cursor-pointer shadow p-2 mx-auto"
            @click="resetCameraPosition"
          >
            Reset Camera
          </button>
        </p>
      </div>
      <!-- Links -->
      <div class="flex justify-around">
        <a
          href="https://threejs.org/examples/?q=controls#misc_controls_trackball"
          target="_blank"
          class="text-gray-600 no-underline hover:text-gray-500 w-1/2 text-center p-2"
          >Original &#8599;
        </a>
        <a
          href="https://github.com/SRLabs/Vue-Three-Demo"
          target="_blank"
          class="text-gray-600 no-underline hover:text-gray-500 w-1/2 text-center p-2"
          >Github &#8599;
        </a>
      </div>
    </div>
  </div>
</template>
