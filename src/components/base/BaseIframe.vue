<template>
  <div class="base-iframe">
    <iframe frameborder="0" scrolling="no" title="title" :src="src"></iframe>
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped>
.base-iframe {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include border("border");
  &:before {
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff00;
    pointer-events: all;
  }
  > iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
