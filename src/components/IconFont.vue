<template>
  <svg :class="['iconfont']" aria-hidden="true">
    <use :xlink:href="`#icon-${props.type}`"></use>
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.iconfont {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}
</style>
