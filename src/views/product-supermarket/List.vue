<template>
  <div class="list">
    <aside>
      <div class="title">数据资源分类</div>
      <div
        class="item flex"
        v-for="item in resourceList"
        :class="{ active: resourceType === item.label }"
        :key="item.label"
        @click="resourceChange(item.label)"
      >
        <div class="label">{{ item.label }}</div>
        <div class="num">({{ item.num }})</div>
      </div>
    </aside>
    <main>
      <div class="search flex">产品超市列表</div>
      <div class="content" v-loading="loadFlag">
        <el-scrollbar height="100%" v-if="List.length">
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
          <ListItem v-for="item in List" :key="item.id" :item="item" />
        </el-scrollbar>
        <div class="no-data" v-else>
          <BaseImg
            src="productSupermarket/no-data.png"
            :width="100"
            :height="100"
          />
          <span>暂无数据</span>
        </div>
      </div>
      <BasePagination v-model="pageInfo" @pageChange="pageChange" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import ListItem from "./components/ListItem.vue";

const Router = useRouter();
const pageInfo = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 10,
});

const List = ref([
  {
    id: "1",
    title: "1119999999999999999999999999999999999999999",
    name: "22222288888888888888888888888888888888888888888882",
    img: "data:image/png;base64,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",
  },
]);
const loadFlag = ref(false);
const resourceList = ref([
  {
    label: "全部",
    num: 10,
  },
  {
    label: "电网侧数据",
    num: 10,
  },
  {
    label: "政务侧数据",
    num: 10,
  },
  {
    label: "用户侧数据",
    num: 10,
  },
]);
const resourceType = ref("全部");

const getTableList = () => {
  // loadFlag.value = true;
};

const pageChange = () => {
  getTableList();
};

const resourceChange = (e: string) => {
  if (resourceType.value === e) return;
  resourceType.value = e;
  pageInfo.pageNo = 1;
  pageInfo.pageSize = 10;
  getTableList();
};

onMounted(() => {
  getTableList();
});
</script>

<style lang="scss" scoped>
.list {
  flex: 1;
  overflow: hidden;
  padding: $spacing-l;
  display: flex;
  aside {
    width: 320px;
    height: 200px;
    @include bgColor("white");
    border-radius: 2px;
    margin-right: $spacing-l;
    padding: $spacing-m $spacing-l;
    box-sizing: border-box;
    .title {
      color: #29334e;
      margin-bottom: $spacing-m;
    }
    .item {
      height: 32px;
      border-radius: 2px;
      margin-bottom: $spacing-xs;
      padding: 0 10px;
      cursor: pointer;
    }
    .active {
      background: rgba(41, 52, 78, 0.06);
    }
  }
  main {
    height: 100%;
    flex: 1;
    overflow: hidden;
    @include bgColor("white");
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .search {
      height: 44px;
      padding: 0 $spacing-l;
      border-bottom: 1px solid rgba(41, 52, 78, 0.15);
      color: #29344e;
      font-size: $font-size-l;
      :deep(.el-input) {
        width: 260px;
        .el-input-group__append {
          width: 56px;
          @include bgColor("blue");
          color: $light-white;
          cursor: pointer;
          font-size: $font-size-m;
          padding: 0;
          &:not(.is-disabled):hover {
            @include bgColor("blue-6");
            @include borderColor("blue-6");
          }
          &:active {
            @include bgColor("blue-6");
            @include borderColor("blue-6");
          }
        }
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      padding: $spacing-l;
      :deep(.el-scrollbar) {
        width: 100%;
        .el-scrollbar__view {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .no-data {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgba(41, 51, 78, 0.65);
        :deep(.base-image) {
          margin-bottom: $spacing-m;
          font-size: 12px;
          color: rgba(41, 51, 78, 0.65);
          line-height: 20px;
        }
      }
    }
    :deep(.el-pagination) {
      display: flex;
      justify-content: flex-end;
      margin: 0;
      padding: $spacing-s $spacing-l $spacing-s 0;
      border-top: 1px solid #d6dde7;
    }
  }
  :deep(.el-input__suffix) {
    .el-icon {
      font-size: $font-size-l;
    }
  }
  :deep(.el-select-v2__suffix) {
    .el-icon:last-child {
      font-size: $font-size-l;
    }
    .el-icon:first-child {
      font-size: $font-size-m;
    }
  }
}
</style>
