<template>
  <div class="base-table" ref="baseTableRef">
    <el-table
      v-bind="$attrs"
      :data="data"
      :span-method="spanMethod"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      :height="realHeight"
      :row-class-name="rowClassName"
      :current-row-key="currentRowKey"
      :max-height="maxHeight"
      ref="tableRef"
      :empty-text="noDataText"
      header-cell-class-name="base-table-header-cell"
      cell-class-name="base-table-cell"
      :highlight-current-row="highlightCurrentRow"
      @current-change="highLightChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="40"
        :selectable="selectable"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="60"
      >
      </el-table-column>
      <template v-for="(item, index) in configs" :key="index">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :filters="item.filters"
          :filter-method="item.filterFun"
          v-if="data && data.length > 0"
        >
          <template #header v-if="item.filters || item.headerSlot">
            <template v-if="item.filters">
              {{ item.label }}
              <BaseImg
                :src="'maintenance/filter.png'"
                :width="12"
                :height="12"
                @click="filterClick"
              ></BaseImg>
            </template>
            <template v-if="item.headerSlot">
              <slot :name="item.headerSlot" :label="item.label"></slot>
            </template>
          </template>
          <template #default="scope">
            <slot :name="item.slotName || item.prop" :row="scope.row">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :filters="item.filters"
          :filter-method="item.filterFun"
          v-else
        >
          <template #header v-if="item.filters || item.headerSlot">
            <template v-if="item.filters">
              {{ item.label }}
              <BaseImg
                :src="'maintenance/filter.png'"
                :width="12"
                :height="12"
                @click="filterClick"
              ></BaseImg>
            </template>
            <template v-if="item.headerSlot">
              <slot :name="item.headerSlot" :label="item.label"></slot>
            </template>
          </template>
          <template #default="scope">
            <slot :name="item.slotName || item.prop" :row="scope.row">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="height ? showPagination && height > 0 : showPagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="pageConfig"
      :background="true"
      :total="total"
      class="base-table-pagination"
    >
      <template
        v-if="
          pageConfig.indexOf('sizes') === -1 &&
          pageConfig.indexOf('pager') === -1
        "
      >
        <div class="base-table-pager-total">
          {{ `${currentPage}/${Math.ceil(total / pageSize)}` }}
        </div>
      </template>
      <template v-else>
        <div class="base-table-pager-total">共{{ total }}条</div>
      </template>
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ColumnCls, ElLoading } from "element-plus";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import ElTableColumn from "element-plus/es/components/table/src/tableColumn";
import { isNumber } from "lodash";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { configItem } from "./type";

const props = withDefaults(
  defineProps<{
    data: any[];
    configs: configItem[];
    showSelectColumn?: boolean;
    selectable?: (row: any, index: number) => boolean;
    height?: number | string;
    showIndexColumn?: boolean;
    showPagination?: boolean;
    spanMethod?:
      | ((data: {
          row: any;
          rowIndex: number;
          column: TableColumnCtx<any>;
          columnIndex: number;
        }) =>
          | number[]
          | {
              rowspan: number;
              colspan: number;
            }
          | undefined)
      | undefined;
    total?: number;
    pageSize?: number;
    pageSizes?: number[];
    maxHeight?: number;
    currentRowKey?: string;
    pageConfig?: string;
    loading?: boolean;
    highlightCurrentRow?: boolean;
    emptyText?: string;
  }>(),
  {
    configs: () => [],
    showSelectColumn: false,
    selectable: () => {
      return true;
    },
    showIndexColumn: false,
    showPagination: true,
    total: 0,
    pageSizes: () => [5, 10, 20, 40, 50],
    pageSize: 10,
    currentRowKey: "",
    pageConfig: "slot, prev, pager, next, sizes",
    loading: false,
    highlightCurrentRow: false,
    emptyText: "",
  }
);

const currentPage = ref(1);
const pageSize = ref(props.pageSize);
const realHeight = computed(() =>
  props.showPagination
    ? props.height
      ? isNumber(props.height)
        ? props.height - 36
        : `calc(${props.height} - 36px)`
      : props.height
    : props.height
);
const emit = defineEmits([
  "changePageSize",
  "changePageNumber",
  "selectionChange",
  "select",
  "selectionAll",
  "rowClassName",
  "highLightChange",
]);

watch(
  () => currentPage.value,
  (val) => {
    emit("changePageNumber", val);
  }
);

watch(
  () => pageSize.value,
  (val) => {
    emit("changePageSize", val);
  }
);

watch(
  () => props.pageSize,
  (val) => {
    pageSize.value = val;
  }
);

const handleSelectionChange = (event: any) => {
  emit("selectionChange", event);
};
const handleSelect = (event: any, row: any) => {
  emit("select", event, row);
};
const handleSelectAll = (event: any) => {
  emit("selectionAll", event);
};
const rowClassName: ColumnCls<any> = ({ row, rowIndex }) => {
  emit("rowClassName", { row, rowIndex });
  return "";
};
const highLightChange = (event: any) => {
  emit("highLightChange", event);
};

const tableRef = ref();
const baseTableRef = ref();
let loadingInstance;

const noDataText = computed(() =>
  props.loading ? " " : props.emptyText || "暂无数据"
);

const clearSelect = () => tableRef.value?.clearSelection();

watch(
  () => [props.configs, props.data],
  () => {
    tableRef.value?.doLayout();
  },
  {
    deep: true,
  }
);

watch(
  () => props.loading,
  (loading) => {
    doLoading(loading);
  }
);

const doLoading = (loading) => {
  if (loading) {
    nextTick(() => {
      loadingInstance = ElLoading.service({
        target: baseTableRef.value,
        background: "transparent",
        body: false,
        fullscreen: false,
      });
    });
  } else {
    loadingInstance?.close();
  }
};
const doLayout = () => {
  tableRef.value?.doLayout();
};

const resetCurrentPage = () => {
  currentPage.value = 1;
  setTimeout(() => {
    if (pageSize.value !== props.pageSize) {
      pageSize.value = props.pageSize;
    }
  });
};
const toggleRowSelection = (row, selected) => {
  tableRef.value?.toggleRowSelection(row, selected);
};

function filterClick(e: any) {
  e.target.nextElementSibling.click();
}

defineExpose({
  doLayout,
  resetCurrentPage,
  toggleRowSelection,
  clearSelect,
});

onMounted(() => {
  doLoading(props.loading);
});
</script>

<style lang="scss" scoped>
.base-table {
  .base-table-pagination {
    margin: $spacing-s 0;
    float: right;
  }
  .base-table-pagination-pager-total {
    font-size: $font-size-m;
  }
  :deep(.el-pagination) {
    padding-right: 0;
    .el-pager li {
      min-width: $height-l;
    }
    &.is-background {
      .btn-prev:disabled,
      .btn-next:disabled {
        background: transparent;
      }
    }
    .el-pagination__sizes {
      margin-right: 0;
    }
  }
  &-pager-total {
    font-size: $font-size-m;
  }
}
</style>
