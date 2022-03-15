<script setup>
import { ref, onMounted } from "vue";
import { usePyramidsStore } from "@/stores/pyramids";

let height = 0;
let width = 0;
const store = usePyramidsStore();
const viewport = ref(null);

const { INIT, ANIMATE, RESIZE } = store;

onMounted(() => {
  height = viewport.value.offsetHeight;
  width = viewport.value.offsetWidth;
  INIT(width, height, viewport.value).then(() => {
    ANIMATE();
    window.addEventListener(
      "resize",
      () => {
        RESIZE(viewport.value.offsetWidth, viewport.value.offsetHeight);
      },
      true
    );
  });
});
</script>

<template>
  <div class="viewport" ref="viewport"></div>
</template>

<style>
.viewport {
  height: 100%;
  width: 100%;
}
</style>
