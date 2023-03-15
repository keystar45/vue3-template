<template>
  <img
    :class="[
      'base-image',
      { 'base-image-unActive': disabled },
      { readOnly: readOnly },
    ]"
    :style="{
      width: width === 'auto' ? 'auto' : width + 'px',
      height: height === 'auto' ? 'auto' : height + 'px',
      transform: transform,
      transition: transition,
    }"
    :src="getImageUrl(src)"
    :alt="alt"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width: number | "auto";
    height: number | "auto";
    src: string;
    alt: string;
    disabled: boolean;
    readOnly: boolean;
    transform: string;
    transition: string;
  }>(),
  {
    width: 14,
    height: 14,
    src: "",
    alt: "",
    disabled: false,
    readOnly: false,
    transform: "",
    transition: "",
  }
);
// vite 官方默认的配置，打包后会把图片名加上 hash值，
// 但是直接通过 :src="imgSrc"方式引入并不会在打包的时候解析，导致开发环境可以正常引入，打包后却不能显示的问题
function getImageUrl(src: string) {
  return new URL(`../../assets/${src}`, import.meta.url).href;
}
</script>

<style lang="scss">
.base-image {
  display: inline-block;
}

.readOnly {
  pointer-events: none;
}

.base-image-unActive {
  opacity: 0.4;
}
</style>
