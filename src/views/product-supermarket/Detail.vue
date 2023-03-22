<template>
  <div class="detail" v-loading="loadFlag">
    <header>
      <BaseSvg icon="icon-jiantou-zuo" @click="goBack" />
      <BaseSvg icon="icon-biao" colorType="blue" />
      <div class="title">{{ tableName }}</div>
    </header>
    <main>
      <aside>
        <div class="title">基础信息</div>
        <div class="item flex">
          <div class="label">描述:</div>
          <div class="value">{{ content }}</div>
        </div>
        <div class="item flex">
          <div class="label">数据来源:</div>
          <div class="value">{{ datasourceDescription }}</div>
        </div>
        <div class="item flex" style="height: 20px">
          <div class="label">数据热度:</div>
          <div class="value">
            <el-rate
              disabled-void-color="#C8CBD2"
              void-color="#C8CBD2"
              v-model="dataHeat1"
              disabled
            />
            <el-rate
              disabled-void-color="#C8CBD2"
              void-color="#C8CBD2"
              v-model="dataHeat"
              disabled
            />
          </div>
        </div>
        <div class="item flex">
          <div class="label">更新频率:</div>
          <div class="value">不定期</div>
        </div>
        <div class="item flex">
          <div class="label">更新时间:</div>
          <div class="value">{{ updateTimeString }}</div>
        </div>
        <div class="item flex">
          <div class="label">标签:</div>
          <div class="tag">
            <div class="tag-item flex" v-for="(tag, i) in tagLists" :key="i">
              {{ tag }}
            </div>
          </div>
        </div>
      </aside>
      <section>
        <div class="title">数据预览</div>
        <BaseTable
          :showPagination="false"
          :data="tableData"
          :configs="configs"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { DirectoryDetail } from "@/apis/dataDirectory";
import { RepCodeType } from "@/common/commonEnum";
import { useQuery } from "@/hooks/useRouterParams";
import { DirectoryDetailModel } from "@/model/dataDirectory";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

const Router = useRouter();

const basicInfo = reactive<DirectoryDetailModel>({
  comment: "",
  content: "",
  dataHeat: 0,
  dataList: [],
  datasourceDescription: "",
  name: "",
  tagLists: [],
  updateTimeString: "",
});

const dataHeat1 = ref(0);

const { content, dataHeat, datasourceDescription, tagLists, updateTimeString } =
  toRefs(basicInfo);

const loadFlag = ref(false);

const tableName = ref("");

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
>([]);

const tableData = ref<any[]>([]);

const goBack = () => {
  Router.go(-1);
};

const getDetail = (id: string) => {
  loadFlag.value = true;
  DirectoryDetail({
    tableId: id,
  })
    .then((res) => {
      if (res?.code === RepCodeType.success) {
        basicInfo.comment = res.data.comment;
        basicInfo.content = res.data.content;
        basicInfo.dataHeat = res.data.dataHeat * 0.05;
        basicInfo.datasourceDescription = res.data.datasourceDescription;
        basicInfo.tagLists = res.data.tagLists;
        basicInfo.updateTimeString = res.data.updateTimeString;
        res?.data?.dataList[0].forEach((el, i) => {
          configs.value.push({
            prop: i,
            label: el,
          });
        });
        res?.data?.dataList.forEach((el, i) => {
          if (i > 0) {
            tableData.value.push(Object.assign({}, el));
          }
        });
      } else if (res?.code === RepCodeType.forbidden) {
        Router.push("/login");
      } else {
        ElMessage.error(res?.msg);
      }
    })
    .finally(() => {
      loadFlag.value = false;
    });
};

onMounted(() => {
  const { id, name } = useQuery<{ id: string; name: string }>();
  tableName.value = name;
  getDetail(id);
});
</script>

<style lang="scss" scoped>
.detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @include bgColor("white");
  header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 $spacing-l;
    @include color("title");
    border-bottom: 1px solid rgba(41, 51, 78, 0.15);
    :deep(.svg) {
      font-size: $font-size-xxl;
    }
    :deep(.blue) {
      font-size: $font-size-xl;
      margin-left: $spacing-m;
      margin-right: $spacing-s;
      color: #9882ff;
    }
    .title {
      font-size: $font-size-xl;
      font-weight: 600;
      color: #29334e;
    }
  }
  main {
    flex: 1;
    overflow: hidden;
    display: flex;
    aside {
      width: 360px;
      height: 100%;
      border-right: 1px solid rgba(41, 51, 78, 0.15);
      padding: $spacing-l;
      box-sizing: border-box;
      .title {
        color: #29334e;
        margin-bottom: $font-size-xl;
      }
      .item {
        font-size: $font-size-m;
        line-height: $height-m;
        margin-bottom: $spacing-s;
        align-items: flex-start;
        .label {
          @include color("secondary");
          width: 110px;
        }
        .value {
          color: #29334e;
          flex: 1;
          position: relative;
          :deep(.el-rate) {
            height: $height-m;
            .el-rate__item {
              svg {
                font-size: $font-size-xxl;
              }
              .el-rate__icon {
                font-size: $font-size-xxl;
              }
              .el-icon.el-rate__icon.is-active,
              .el-rate__decimal {
                color: #567aff;
                margin-right: $spacing-base;
              }
              .el-icon {
                margin-right: $spacing-base;
              }
            }
          }
          :deep(.el-rate:first-child) {
            position: absolute;
          }
        }
        .tag {
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          &-item {
            height: $height-l;
            background: rgba(41, 51, 78, 0.1);
            border-radius: 2px;
            line-height: $height-l;
            @include color("title");
            padding: 0 $spacing-s;
            margin: 0 $spacing-s $spacing-s 0;
          }
        }
      }
    }
    section {
      flex: 1;
      overflow: hidden;
      padding: $spacing-l;
      .title {
        color: #29334e;
        margin-bottom: $spacing-l;
      }
      :deep(.base-table) {
        height: calc(100% - 36px);
        .el-table {
          height: 100%;
          .el-scrollbar__view {
            height: 100%;
            .el-table__empty-text {
              background-image: url("@/assets/dataDirectory/no-data.png");
              background-repeat: no-repeat;
              background-position: center top;
              background-size: 100px 100px;
              height: 130px;
              line-height: $height-l;
              display: flex;
              align-items: flex-end;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
