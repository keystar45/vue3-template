<template>
  <div class="list">
    <aside>
      <div class="title">数据资源分类</div>
      <div
        class="item flex"
        v-for="item in resourceList"
        :class="{ active: resourceType === item.id }"
        :key="item.categoryName"
        @click="resourceChange(item.id)"
      >
        <div class="label">{{ item.categoryName }}</div>
        <div class="num">({{ item.productNum }})</div>
      </div>
    </aside>
    <main v-show="routerUrl === 'list'">
      <div class="search flex">产品超市列表</div>
      <div class="content" v-loading="loadFlag">
        <el-scrollbar height="100%" v-if="list.length">
          <ListItem
            v-for="item in list"
            :key="item.id"
            :item="item"
            @detail="goDetail"
          />
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
    <Detail
      v-show="routerUrl === 'detail'"
      :id="currentId"
      :name="currentName"
      @back="routerUrl = 'list'"
      ref="detailRef"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import ListItem from "./components/ListItem.vue";
import Detail from "./components/Detail.vue";
import { DataCategory, List } from "@/apis/supermarket";
import { DataCategoryRes, UndefinedRecord } from "@/model/supermarket";

const pageInfo = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 10,
});

const routerUrl = ref("list");

const currentId = ref("");

const currentName = ref("");

const detailRef = ref();

const list = ref<UndefinedRecord[]>([]);
const loadFlag = ref(false);
const resourceList = ref<DataCategoryRes[]>([]);
const resourceType = ref<string | number>("");

const getDataCategory = () => {
  DataCategory().then((res) => {
    resourceList.value = [
      {
        categoryName: "全部",
        id: "",
        productNum: 0,
      },
    ];
    res.data.forEach((el) => {
      resourceList.value.push(el);
      resourceList.value[0].productNum =
        Number(resourceList.value[0].productNum) + Number(el.productNum);
    });
  });
};

const getTableList = () => {
  loadFlag.value = true;
  List({
    categoryIds: resourceType.value === "" ? [] : [resourceType.value],
    pageRequest: {
      pageNo: pageInfo.pageNo,
      pageSize: pageInfo.pageSize,
    },
  })
    .then((res) => {
      pageInfo.total = Number(res.data.total);
      list.value = res.data.records;
    })
    .finally(() => (loadFlag.value = false));
};

const pageChange = () => {
  // getTableList();
  console.log(pageInfo, "pageInfo");
};

const resourceChange = (e: string | number) => {
  if (resourceType.value === e) return;
  routerUrl.value = "list";
  resourceType.value = e;
  pageInfo.pageNo = 1;
  pageInfo.pageSize = 10;
  getTableList();
};

const goDetail = ({ id, name }) => {
  currentId.value = id;
  currentName.value = name;
  routerUrl.value = "detail";
  detailRef.value.getDetail(id);
};

onMounted(() => {
  getDataCategory();
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
