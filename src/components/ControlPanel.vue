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
      <div v-if="CAMERA_POSITION">
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["CAMERA_POSITION"])
  },
  methods: {
    ...mapMutations(["SET_CAMERA_POSITION", "RESET_CAMERA_ROTATION"]),
    resetCameraPosition() {
      this.SET_CAMERA_POSITION({ x: 0, y: 0, z: 500 });
      this.RESET_CAMERA_ROTATION();
    }
  }
};
</script>
