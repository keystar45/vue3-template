<template>
  <div>
    <span v-if="!!title">{{ `${title}：` }}</span>
    <el-select
      v-bind="$attrs"
      :style="style"
      :placeholder="placeholder"
      v-model="value"
      @update:modelValue="onInput"
      @change="onChange"
    >
      <el-option
        v-for="item in options"
        :key="item[value]"
        :label="item[label]"
        :value="item[cvalue]"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
  },
  title: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array as () => { value: any; label: any; cvalue?: any }[],
    default: () => [],
  },
  width: {
    type: Number,
    default: 160,
  },
  marginRight: {
    type: Number,
    default: 20,
  },
  cvalue: {
    type: String,
    default: "value",
  },
  label: {
    type: String,
    default: "label",
  },
});
const value = ref("");
const emit = defineEmits(["update:modelValue", "change"]);
const onInput = (e) => emit("update:modelValue", e);
const onChange = (e) => emit("change", e);
watchEffect(() => {
  value.value = props.modelValue;
});
const style = reactive({
  marginRight: `${props.marginRight}px`,
  width: `${props.width}px`,
});
</script>

<style lang="scss" scoped>
span {
  font-size: $font-size-s;
  @include color("text");
}
</style>
