<template>
  <el-form
    ref="form"
    :class="className"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
  >
    <el-form-item
      v-for="(item, index) in formItemConfig"
      :key="index"
      :prop="item.value"
      :label="item.label"
      :class="`${item.className} ${item.inline ? 'inline' : ''}`"
      v-bind="$attrs"
      :labelWidth="item.labelWidth || $attrs.labelWidth"
    >
      <template v-if="item.labelTip" #label="{ label }">
        {{ label }}
        <base-tooltip placement="top" :content="item.labelTip" raw-content>
          <icon-font type="bangzhu-dark" />
        </base-tooltip>
        :
      </template>
      <!-- 自定义插槽 -->
      <template v-if="item.slotName">
        <slot :scope="model" :config="item" :name="item.slotName"></slot>
      </template>
      <!-- 文本展示值 -->
      <template v-if="item.textShow">
        <span>{{ item.textValue || model[item.value] }}</span>
      </template>
      <component
        v-if="!item.slotName && !item.textShow"
        :is="item.comp"
        :disabled="item.disabled"
        v-model="model[item.value]"
        :type="item.type"
        :placeholder="item.placeholder"
        @change="change(item.event, model[item.value])"
        v-bind="{ clearable: true, filterable: true, ...item.bind }"
        :style="{ width: item.width || '100%' }"
      >
        <!-- 前置文本 -->
        <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
        <!-- 后置文本 -->
        <template #append v-if="item.append">{{ item.append }}</template>
        <!-- 子组件自定义插槽 -->
        <template v-if="item.childSlotName">
          <slot :name="item.childSlotName"></slot>
        </template>
        <component
          v-else
          :is="compChildName(item)"
          v-for="(value, key, index) in listTypeInfo[item.list]"
          :key="index"
          :disabled="item.disabled"
          :label="value.label ? value.label : value[item.cLabel]"
          :value="value.value ? value.value : value[item.cValue]"
        >
          {{ value.label }}
        </component>
      </component>
      <!-- 自定义居右内容插槽 -->
      <slot
        :scope="model"
        :config="item"
        :name="`right-${item.rightSlotName}`"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { computed, onMounted, ref } from "vue";
import IconFont from "@/components/IconFont.vue";

const props = defineProps({
  data: {
    type: Array as () => any[],
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  listTypeInfo: {
    type: Object,
    default: () => ({}),
  },
  className: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["update:modelValue", "getRef", "change"]);
const form = ref<FormInstance>();
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
    getRef();
  },
});

const formItemConfig = computed(() => {
  return props.data.filter((fieldItem: any) => {
    if (fieldItem.visible && fieldItem.visible.length) {
      return (
        fieldItem.visible.findIndex((item) => {
          return model.value[item.condition] !== item.value;
        }) === -1
      );
    }
    return true;
  });
});

// 子组件名称
const compChildName = (item) => {
  switch (item.comp) {
    case "el-radio-group":
      return "el-radio";
    case "el-checkbox-group":
      return "el-checkbox";
    case "el-select":
      return "el-option";
  }
};
const change = (type, val) => {
  emits("change", type, val);
};
onMounted(() => {
  getRef();
});

const getRef = () => {
  emits("getRef", form.value);
};
</script>

<style lang="scss" scoped>
.el-form-item {
  &.inline {
    display: inline-flex;
  }
}
.el-form-item__label {
  .iconfont {
    position: relative;
    top: 2px;
    padding: 0 5px;
    font-size: 14px;
  }
}
</style>
