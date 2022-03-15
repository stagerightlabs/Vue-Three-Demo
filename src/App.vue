<script>
import ViewPort from "@/components/ViewPort.vue";
import ControlPanel from "@/components/ControlPanel.vue";

export default {
  components: {
    viewport: ViewPort,
    panel: ControlPanel
  }
};
</script>

<template>
  <div id="app">
    <panel></panel>
    <viewport></viewport>
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0px;
}
canvas {
  position: relative;
}
#app {
  height: 100%;
}
</style>
