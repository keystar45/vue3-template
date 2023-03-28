<template>
  <el-radio-group :model-value="activeTab" @change="change">
    <el-radio-button
      v-for="(item, index) in tabs"
      :key="index"
      :label="item.value"
      >{{ item.name }}</el-radio-button
    >
  </el-radio-group>
</template>

<script setup lang="ts">
defineProps({
  activeTab: {
    type: String,
    default: "",
  },
  tabs: {
    type: Array,
    default: () => [] as { name: string; value: any }[],
  },
});

const emits = defineEmits(["change"]);

const change = (val) => {
  emits("change", val);
};
</script>

<style lang="scss" scoped></style>
