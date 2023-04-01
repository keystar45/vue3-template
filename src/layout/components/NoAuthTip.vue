<template>
  <div class="mask-layer">
    <div class="mask-layer-tip">无权限，请联系管理员</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.mask-layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  @include bgColor("bg");
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
