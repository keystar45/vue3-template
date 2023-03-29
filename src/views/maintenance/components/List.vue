<template>
  <div class="list">
    <header>
      <div>产品列表</div>
      <BaseButton type="primary" @click="addProduct">
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
      <BaseTable
        :showPagination="false"
        :data="tableData"
        :configs="configs"
        v-loading="loadFlag"
      >
        <template #pdName="{ row }">
          <BeyondTooltip width="100%" :content="row.pdName" />
        </template>
        <template #pdProvider="{ row }">
          <BeyondTooltip width="100%" :content="row.pdProvider" />
        </template>
        <template #pdDesc="{ row }">
          <BeyondTooltip width="100%" :content="row.pdDesc" />
        </template>
        <template #pdState="{ row }">
          <div class="state flex">
            <div :class="`state-${row.pdState}`"></div>
            <div>{{ stateEnum[row.pdState] }}</div>
          </div>
        </template>
        <template #operate="{ row }">
          <div class="operate-list">
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="上架"
              placement="top"
              v-if="!row.pdState"
            >
              <BaseSvg icon="icon-shangjia" @click="operateHandler(1, row)" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="下架"
              placement="top"
              v-else
            >
              <BaseSvg icon="icon-xiajia" @click="operateHandler(2, row)" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="详情"
              placement="top"
            >
              <BaseSvg icon="icon-a-xiangqingchakan" @click="detail(row)" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="编辑"
              placement="top"
            >
              <BaseSvg icon="icon-bianji" @click="edit(row.id)" />
            </base-tooltip>
            <base-tooltip
              :hide-after="0"
              effect="light"
              content="删除"
              placement="top"
            >
              <BaseSvg
                icon="icon-shanchu"
                :disabled="row.pdState"
                @click="operateHandler(3, row)"
              />
            </base-tooltip>
          </div>
        </template>
      </BaseTable>
      <BasePagination v-model="pageInfo" @pageChange="pageChange" />
    </main>
    <DeleteDialog
      :visible="deleteVisible"
      :operate="operate"
      :id="currentId"
      :title="currentName"
      @close="closeDelete"
    />
    <ProductDetail
      :visible="detailVisible"
      :id="currentId"
      :title="currentName"
      @close="closeDetail"
    />
    <CreateProduct
      :visible="addVisible"
      :id="currentId"
      :libList="filterConfigs[1].selectList"
      @close="closeAdd"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DeleteDialog from "./DeleteDialog.vue";
import ProductDetail from "./ProductDetail.vue";
import { useTableData } from "../hooks";
import CreateProduct from "./CreateProduct.vue";

const {
  filterConfigs,
  searchModelObj,
  tableData,
  configs,
  pageInfo,
  stateEnum,
  searchAction,
  resetAction,
  pageChange,
  getTableList,
  loadFlag,
} = useTableData();

const deleteVisible = ref(false);

const operate = ref(1);

const detailVisible = ref(false);

const addVisible = ref(false);

const currentId = ref("");

const currentName = ref("");

const operateHandler = (e: number, row) => {
  currentId.value = row.id;
  currentName.value = row.pdName;
  operate.value = e;
  deleteVisible.value = true;
};

const closeDelete = (e?: number) => {
  deleteVisible.value = false;
  if (e) getTableList();
  currentId.value = "";
  currentName.value = "";
};

const detail = (row) => {
  currentId.value = row.id;
  detailVisible.value = true;
};

const closeDetail = () => {
  detailVisible.value = false;
  currentId.value = "";
};

const addProduct = () => {
  addVisible.value = true;
};

const closeAdd = (e?: number) => {
  addVisible.value = false;
  if (e) getTableList();
  currentId.value = "";
};

const edit = (id: string) => {
  currentId.value = id;
  addVisible.value = true;
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
          .state-true {
            width: 8px;
            height: 8px;
            background: #00cb50;
            box-shadow: 0px 0px 3px 0px #00cb50;
            border-radius: 4px;
            margin-right: 6px;
          }
          .state-false {
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
