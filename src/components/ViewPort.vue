<template>
  <div class="viewport"></div>
</template>

<script>
import { useThreeStore } from "@/store";

export default {
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    const store = useThreeStore();

    store
      .init({
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight,
        el: this.$el,
      })
      .then(() => {
        store.animate();
        window.addEventListener(
          "resize",
          () => {
            store.resize({
              width: this.$el.offsetWidth,
              height: this.$el.offsetHeight,
            });
          },
          true
        );
      });
  },
};
</script>

<style>
.viewport {
  height: 100%;
  width: 100%;
}
</style>
