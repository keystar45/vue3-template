<template>
  <el-select
    v-model="selectVal"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    @change="onChange"
    :teleported="false"
    class="async-select"
    :filterable="filterable"
    remote
    :remote-method="remoteMethod"
    v-el-select-scroll="props.load"
    popper-class="async-select-infinite-list"
  >
    <el-option
      v-for="item in props.list"
      :value="item.value"
      :key="item.value"
      :label="item.label"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  initVal: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  list: {
    type: Array as () => { label: string; value: any }[],
    default: () => [],
  },
  load: {
    type: Function,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  isFinish: {
    type: Boolean,
    default: false,
  },
  dropDownHeight: {
    type: Number,
    default: 150,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["change", "load", "search"]);

const dropDownHeight = computed(() => {
  return props.dropDownHeight + "px";
});
const vElSelectScroll = {
  created(el, binding) {
    const selectWrap = el.querySelector(
      ".el-select-dropdown .el-select-dropdown__wrap"
    );
    selectWrap.addEventListener("scroll", function () {
      const condition =
        selectWrap.scrollHeight - selectWrap.scrollTop <=
        selectWrap.clientHeight;
      condition && !props.isFinish && binding.value();
    });
  },
};

const selectVal = ref("");

const onChange = (val) => {
  emits("change", val);
};

const remoteMethod = (query: string) => {
  if (query) {
    emits("search", query);
  }
};

onMounted(() => {
  selectVal.value = props.initVal;
});
</script>

<style lang="scss">
.async-select {
  width: 280px;
  .async-select-infinite-list {
    height: v-bind(dropDownHeight);
    overflow: auto;
    z-index: 4000;
  }
  > .async-select-infinite-list {
    overflow: hidden;
  }
}
</style>
