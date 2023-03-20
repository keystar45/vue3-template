<template>
  <div class="list">
    <header>
      <div>产品列表</div>
      <BaseButton type="primary">
        <BaseSvg icon="icon-tianjia" />
        新建产品
      </BaseButton>
    </header>
    <main>
      <BaseSearchFilter
        :configs="filterConfigs"
        :search-model-obj="searchModelObj"
        @searchAction="searchAction"
        @resetAction="resetAction"
        class="base-table-page_main_search"
      />
      <BaseTable :showPagination="false" :data="tableData" :configs="configs">
        <template #state="{ row }">
          <div class="state flex">
            <div :class="`state-${row.state}`"></div>
            <div>{{ stateEnum[row.state] }}</div>
          </div>
        </template>
        <template #operate>
          <div class="operate-list">
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="上架"
              placement="top"
            >
              <BaseSvg icon="icon-shangjia" @click="operateHandler(1)" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="下架"
              placement="top"
            >
              <BaseSvg icon="icon-xiajia" @click="operateHandler(2)" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="详情"
              placement="top"
            >
              <BaseSvg icon="icon-a-xiangqingchakan" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="编辑"
              placement="top"
            >
              <BaseSvg icon="icon-bianji" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="删除"
              placement="top"
            >
              <BaseSvg icon="icon-shanchu" @click="operateHandler(3)" />
            </base-tooltip>
          </div>
        </template>
      </BaseTable>
      <BasePagination v-model="pageInfo" @pageChange="pageChange" />
    </main>
    <DeleteDialog
      :visible="deleteVisible"
      :operate="operate"
      @close="closeDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { configItem } from "@/components/base/BaseSearchFilter/type";
import DeleteDialog from "./DeleteDialog.vue";

const filterConfigs = reactive<configItem[]>([
  {
    type: "input",
    valueProp: "name",
    title: "产品名称",
    placeholder: "请输入",
  },
  {
    type: "select",
    valueProp: "db",
    title: "专题库",
    placeholder: "请选择",
    selectList: [] as {
      id: number;
      name: string;
    }[],
  },
  {
    type: "select",
    valueProp: "state",
    title: "状态",
    placeholder: "请选择",
    selectList: [] as {
      id: number;
      name: string;
    }[],
  },
]);

const searchModelObj = reactive({
  name: "",
  db: "",
});

const tableData = ref<any[]>([
  {
    name: "11111",
    state: 1,
  },
]);

const configs = ref<
  {
    prop: any;
    label: string;
    width?: string;
    fixed?: string;
    sortable?: boolean;
    slotName?: string;
    filters?: any;
    filterFun?: any;
    minWidth?: any;
    headerSlot?: string;
  }[]
>([
  {
    label: "产品名称",
    prop: "name",
  },
  {
    label: "专题库",
    prop: "name",
  },
  {
    label: "产品提供方",
    prop: "name",
  },
  {
    label: "产品描述",
    prop: "name",
  },
  {
    label: "状态",
    prop: "state",
    slotName: "state",
  },
  {
    label: "创建人",
    prop: "name",
  },
  {
    label: "创建时间",
    prop: "name",
  },
  {
    label: "更新时间",
    prop: "name",
  },
  {
    label: "操作",
    prop: "operate",
    slotName: "operate",
    fixed: "right",
    width: "140",
  },
]);

const pageInfo = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 10,
});

const stateEnum = {
  1: "已上架",
  2: "待上架",
};

const deleteVisible = ref(false);

const operate = ref(1);

const searchAction = () => {};
const resetAction = () => {};

const pageChange = () => {};

const operateHandler = (e: number) => {
  operate.value = e;
  deleteVisible.value = true;
};

const closeDelete = () => {
  deleteVisible.value = false;
};
</script>

<style lang="scss" scoped>
.list {
  flex: 1;
  overflow: hidden;
  width: 80%;
  margin: $spacing-l auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  header {
    height: 44px;
    border-bottom: 1px solid rgba(41, 52, 78, 0.15);
    padding: 0 $spacing-l;
    display: flex;
    align-items: center;
    justify-content: space-between;
    :deep(.base-button) {
      .svg {
        margin-right: $spacing-xs;
        color: #fff;
      }
    }
  }
  main {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    :deep(.base-search-filter) {
      padding: 0 36px;
      .base-search-filter-item {
        margin-bottom: 0;
        margin-top: $spacing-l;
      }
    }
    :deep(.base-table) {
      flex: 1;
      overflow: hidden;
      padding: 0 $spacing-l;
      .el-table {
        height: 100%;
        .el-scrollbar__view {
          height: 100%;
        }
        .state {
          .state-1 {
            width: 8px;
            height: 8px;
            background: #00cb50;
            box-shadow: 0px 0px 3px 0px #00cb50;
            border-radius: 4px;
            margin-right: 6px;
          }
          .state-2 {
            width: 8px;
            height: 8px;
            background: #567aff;
            box-shadow: 0px 0px 3px 0px #567aff;
            border-radius: 4px;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
