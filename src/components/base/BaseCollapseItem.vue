<template>
  <el-collapse-item
    :name="name"
    :title="title"
    :disabled="disabled"
    class="base-collapse-item"
  >
    <template #title><slot name="title"></slot></template>
    <slot></slot>
  </el-collapse-item>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});
</script>
<style lang="scss">
.base-collapse-item {
  .el-collapse-item__header {
    overflow: hidden;
    position: relative;
    &:after {
      content: "展开";
      position: absolute;
      top: 0;
      right: 29px;
      @include color("blue-4");
      font-size: $font-size-s;
    }
    &.is-active {
      &:after {
        content: "收起";
      }
    }
  }
  .el-collapse-item__content {
    padding-bottom: $spacing-l;
  }
  .el-collapse-item__arrow {
    @include color("blue-4");
    transform: rotate(90deg);
    &.is-active {
      transform: rotate(270deg);
    }
  }
}
</style>
