<template>
  <el-tooltip
    effect="light"
    :content="props.content"
    placement="top"
    :disabled="isShow"
    :hide-after="hideAfter"
    popper-class="base-tooltip"
  >
    <div
      class="content"
      :style="{ width: props.width, maxWidth: props.maxWidth }"
      @mouseover="isShowTooltip"
    >
      <span ref="contentRef" @click="emit('click')">{{ props.content }}</span>
    </div>
  </el-tooltip>
</template>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  content: {
    type: String,
  },
  width: {
    type: String,
  },
  maxWidth: {
    type: String,
  },
  hideAfter: {
    type: Number,
    default: 200,
  },
});
// 使用isShow来控制tooltip是否显示
const isShow = ref<boolean>(true);
// 在span标签上定义一个ref
const contentRef = ref();
const emit = defineEmits(["click"]);
const isShowTooltip = function (): void {
  // 计算span标签的offsetWidth与盒子元素的offsetWidth，给isShow赋值
  if (contentRef.value.parentNode.offsetWidth >= contentRef.value.offsetWidth) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
};
</script>
<style lang="scss" scoped>
.content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // display: inline-flex;
  // align-items: center;
}
</style>
