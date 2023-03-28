<template>
  <el-cascader-panel
    :options="props.options"
    :props="{
      expandTrigger: 'hover',
    }"
    ref="contextMenuRef"
    v-show="props.contextMenuFlag"
    @click="clickContextMenu"
    :model-value="props.checkedContextMenu"
  />
</template>

<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  options: {
    type: Array as PropType<
      {
        label: string;
        value: string;
        disabled?: boolean;
      }[]
    >,
    default: () => [],
  },
  contextMenuFlag: {
    type: Boolean,
    default: false,
  },
  checkedContextMenu: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["clickMenu"]);

const clickContextMenu = (event) => {
  emits("clickMenu", event);
};
</script>
