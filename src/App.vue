<template>
  <el-config-provider :locale="Ch">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import Ch from "element-plus/lib/locale/lang/zh-cn";
</script>
<style lang="scss" scoped></style>
