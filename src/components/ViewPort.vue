<template>
  <div class="viewport"></div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    // ratio: { default: 9 / 16 }
  },
  data() {
    return {
      height: 0
    };
  },
  methods: {
    ...mapMutations(["RESIZE"]),
    ...mapActions(["INIT", "ANIMATE"])
  },
  mounted() {
    this.INIT({
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight,
      el: this.$el
    }).then(() => {
      this.ANIMATE();
      window.addEventListener(
        "resize",
        () => {
          this.RESIZE({ width: window.innerWidth, height: window.innerHeight });
        },
        false
      );
    });
  }
};
</script>

<style>
.viewport {
  height: 100%;
  width: 100%;
}
</style>
