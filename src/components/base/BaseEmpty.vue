<template>
  <el-empty description="暂无数据" class="base-empty">
    <template v-slot:image><div></div></template>
  </el-empty>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.base-empty {
  height: 100%;
  width: 100%;
}
</style>
