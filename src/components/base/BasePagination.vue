<template>
  <el-pagination
    background
    v-bind="$attrs"
    :current-page="modelValue.pageNo"
    :page-sizes="pageSizes"
    :page-size="modelValue.pageSize"
    :layout="pageConfig"
    :total="modelValue.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    class="base-pagination"
  >
    <template
      v-if="
        pageConfig.indexOf('sizes') === -1 && pageConfig.indexOf('pager') === -1
      "
    >
      <div class="base-pagination-pager-total">
        {{
          `${modelValue.pageNo}/${Math.ceil(
            modelValue.total / modelValue.pageSize
          )}`
        }}
      </div>
    </template>
    <template v-else>
      <div class="base-pagination-pager-total">共{{ modelValue.total }}条</div>
    </template>
  </el-pagination>
</template>
<script lang="ts" setup>
import { toRefs, withDefaults } from "vue";
interface PageInfo {
  pageNo: number;
  pageSize: number;
  total: number;
}
interface Props {
  modelValue?: PageInfo;
  pageConfig?: string;
  pageSizes?: number[];
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 999,
    };
  },
  pageConfig: "slot, prev, pager, next, sizes",
  pageSizes: () => [5, 10, 20, 40, 50],
});

const emits = defineEmits<{
  (e: "update:modelValue", value: object): void;
  (e: "pageChange", value: object): void;
}>();

const { modelValue } = toRefs(props);
function handleSizeChange(value: number) {
  emits(
    "update:modelValue",
    Object.assign(modelValue.value, { pageSize: value })
  );
  emits("pageChange", modelValue.value);
}
function handleCurrentChange(value: number) {
  emits(
    "update:modelValue",
    Object.assign(modelValue.value, { pageNo: value })
  );
  emits("pageChange", modelValue.value);
}
</script>
<style lang="scss" scoped>
.base-pagination {
  margin: $spacing-s 0;
  float: right;
  &-pager-total {
    font-size: $font-size-m;
  }
  padding-right: 0;
  &.is-background {
    :deep(.btn-prev),
    :deep(.btn-next) {
      &:disabled {
        background: transparent;
      }
    }
  }
  :deep(.el-pagination__sizes) {
    margin-right: 0;
  }
  :deep(.el-pager) {
    li {
      min-width: $height-l;
    }
  }
}
</style>
