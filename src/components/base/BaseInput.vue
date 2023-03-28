<template>
  <div class="input">
    <span v-if="!!title">{{ `${title}：` }}</span>
    <el-input
      :style="style"
      :maxlength="maxlength"
      :clearable="clearable"
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="props.type"
      @update:modelValue="onInput"
      v-bind="$attrs"
      @keyup.enter="keyupEnter"
      @keyup="keyup"
    >
      <template #prefix v-if="leftIconShow">
        <svg
          t="1650423714071"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5891"
          width="14"
          height="14"
        >
          <path
            d="M480 32a448 448 0 0 1 358.4 716.864 3.584 3.584 0 0 1 0.832 0.576l6.016 5.312 128 128a64 64 0 0 1-84.48 95.808l-6.016-5.312-128-128a64.576 64.576 0 0 1-6.016-6.912A448 448 0 1 1 480 32z m0 96a352 352 0 1 0 0 704 352 352 0 0 0 0-704z"
            p-id="5892"
            :fill="color"
          ></path>
        </svg>
      </template>
      <template #suffix v-if="rightIconShow">
        <svg
          t="1650423714071"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5891"
          width="14"
          height="14"
        >
          <path
            d="M480 32a448 448 0 0 1 358.4 716.864 3.584 3.584 0 0 1 0.832 0.576l6.016 5.312 128 128a64 64 0 0 1-84.48 95.808l-6.016-5.312-128-128a64.576 64.576 0 0 1-6.016-6.912A448 448 0 1 1 480 32z m0 96a352 352 0 1 0 0 704 352 352 0 0 0 0-704z"
            p-id="5892"
            :fill="color"
          ></path>
        </svg>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watchEffect } from "vue";
const props = defineProps({
  leftIconShow: {
    type: Boolean,
    default: false,
  },
  rightIconShow: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
  },
  width: {
    type: Number,
    default: 160,
  },
  marginRight: {
    type: Number,
    default: 20,
  },
  maxlength: {
    type: Number,
  },
  clearable: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  type: {
    type: String,
    default: "text",
  },
});
const value = ref("");
const emit = defineEmits(["update:modelValue", "keyup.enter", "keyup"]);
const onInput = (e) => emit("update:modelValue", e);
const keyupEnter = () => emit("keyup.enter");
const keyup = () => emit("keyup");
const color = computed(() => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    "--color--gray-6"
  );
});
const style = reactive({
  marginRight: `${props.marginRight}px`,
  width: `${props.width}px`,
});
watchEffect(() => {
  value.value = props.modelValue;
});
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;
}

span {
  font-size: $font-size-s;
  @include color("text");
}

:deep(.el-input) {
  .el-input__prefix-inner {
    margin: auto;
  }
}
</style>
