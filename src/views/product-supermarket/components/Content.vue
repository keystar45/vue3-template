<template>
  <div class="result-content">
    <aside>
      <div class="aside">
        <div class="title">数据资源分类</div>
        <el-select-v2
          v-model="resourceType"
          multiple
          clearable
          placeholder="请选择数据资源分类"
          :options="resourceList"
          @change="paramsChange"
        >
        </el-select-v2>
        <div class="title">数据来源</div>
        <el-select-v2
          :height="210"
          v-model="source"
          multiple
          clearable
          placeholder="请选择数据来源"
          :options="sourceList"
          @change="paramsChange"
        >
        </el-select-v2>
        <div class="title">数据类型</div>
        <el-checkbox-group v-model="sourceType" @change="paramsChange">
          <el-checkbox label="实时数据">实时数据</el-checkbox>
          <el-checkbox label="离线数据">离线数据</el-checkbox>
        </el-checkbox-group>
      </div>
    </aside>
    <main>
      <div class="search flex">
        <Sort @sort="sortChange" />
        <el-input v-model="keyWord" placeholder="请输入表名、描述等关键字">
          <template #append>
            <div class="el-input-group__append" @click="paramsChange">搜索</div>
          </template>
        </el-input>
      </div>
      <div class="content" v-loading="loadFlag">
        <el-scrollbar height="100%" v-if="resultList.length">
          <ResultItem v-for="item in resultList" :key="item" :result="item" />
        </el-scrollbar>
        <div class="no-data" v-else>
          <BaseImg src="dataDirectory/no-data.png" :width="100" :height="100" />
          <span>暂无搜索结果</span>
        </div>
      </div>
      <BasePagination v-model="pageInfo" @pageChange="pageChange" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { DirectoryList } from "@/apis/dataDirectory";
import { RepCodeType } from "@/common/commonEnum";
import { DirectoryListModel } from "@/model/dataDirectory";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import ResultItem from "./ListItem.vue";
import Sort from "./Sort.vue";

const Router = useRouter();
const pageInfo = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 10,
});

const resultList = ref([
  {
    id: "11111111",
    comment: "1111111111111111",
    content: "11111111111111111",
    updateTimeString: "2022-12-21 16:23:32",
    tagLists: ["1111111111", "222222222"],
    browseCount: 10,
    favoriteCount: 30,
  },
]);
const loadFlag = ref(false);
const resourceList = ref([
  {
    label: "电网侧数据",
    value: "电网侧数据",
  },
  {
    label: "政务侧数据",
    value: "政务侧数据",
  },
  {
    label: "用户侧数据",
    value: "用户侧数据",
  },
]);
const resourceType = ref([]);
const sourceList = ref([
  {
    label: "省量测中心",
    value: "省量测中心",
  },
  {
    label: "新一代调度支持系统",
    value: "新一代调度支持系统",
  },
  {
    label: "省物联管理平台",
    value: "省物联管理平台",
  },
  {
    label: "省能源大数据中心",
    value: "省能源大数据中心",
  },
  {
    label: "配电自动化系统",
    value: "配电自动化系统",
  },
  {
    label: "省数据中台",
    value: "省数据中台",
  },
]);
const source = ref([]);
const sourceType = ref([]);
const keyWord = ref("");

const sortType = ref(1);

const sortField = {
  1: 0,
  2: 1,
  3: 1,
  4: 2,
  5: 2,
};

const sortMode = {
  1: 1,
  2: 2,
  3: 1,
  4: 2,
  5: 1,
};

const sortChange = (type: number) => {
  sortType.value = type;
  getTableList();
};

const getTableList = () => {
  loadFlag.value = true;
  const req: DirectoryListModel = {
    pageNo: pageInfo.pageNo,
    pageSize: pageInfo.pageSize,
    sortField: 0,
    sortMode: 1,
  };
  req.sortField = sortField[sortType.value];
  req.sortMode = sortMode[sortType.value];
  if (resourceType.value.length) {
    req["dataResourceTags"] = resourceType.value;
  }
  if (source.value.length) {
    req["datasourceDescriptions"] = source.value;
  }
  if (sourceType.value.length) {
    req["dataTypeTags"] = sourceType.value;
  }
  if (keyWord.value) {
    req["keyWords"] = keyWord.value;
  }
  DirectoryList(req)
    .then((res) => {
      if (res?.code === RepCodeType.success) {
        pageInfo.total = Number(res?.data.total);
      } else if (res?.code === RepCodeType.forbidden) {
        Router.push("/login");
      } else {
        ElMessage.error(res?.msg);
      }
    })
    .finally(() => (loadFlag.value = false));
};

const pageChange = () => {
  getTableList();
};

const paramsChange = () => {
  pageInfo.pageNo = 1;
  pageInfo.pageSize = 10;
  getTableList();
};

onMounted(() => {
  getTableList();
});
</script>

<style lang="scss" scoped>
.result-content {
  flex: 1;
  overflow: hidden;
  padding: 0 $spacing-l $spacing-l $spacing-l;
  display: flex;
  .aside {
    width: 320px;
    display: inline-block;
    @include bgColor("white");
    border-radius: 2px;
    margin-right: $spacing-l;
    padding: $spacing-m $spacing-l;
    box-sizing: border-box;
    .title {
      color: #29334e;
      margin-bottom: $spacing-m;
    }
    :deep(.el-select-v2) {
      width: 280px;
      margin-bottom: $spacing-xl;
      .el-tag {
        background: rgba(41, 51, 78, 0.1);
      }
      .el-select-v2__wrapper {
        min-height: 26px;
      }
      .el-select-v2__selected-item {
        input {
          height: 0;
        }
      }
    }
    :deep(.el-checkbox-group) {
      margin-bottom: $spacing-m;
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
      justify-content: space-between;
      :deep(.el-input) {
        width: 260px;
        .el-input-group__append {
          width: 45px;
          @include bgColor("blue");
          color: $light-white;
          cursor: pointer;
          font-size: $font-size-m;
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
      :deep(.el-scrollbar) {
        width: 100%;
      }
      .no-data {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
}
</style>
