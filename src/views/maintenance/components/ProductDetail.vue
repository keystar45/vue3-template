<template>
  <div class="product-detail">
    <BaseDrawer
      title="产品详情"
      cancelText="关闭"
      width="560px"
      :dialogVisible="visible"
      :showFoot="true"
      :showSubmit="false"
      @cancel="close"
    >
      <div class="item">
        <div class="label">产品名称:</div>
        <div class="value">{{ config.pdName }}</div>
      </div>
      <div class="item">
        <div class="label">产品描述:</div>
        <div class="value">
          {{ config.pdDesc }}
        </div>
      </div>
      <div class="item">
        <div class="label">专题库:</div>
        <div class="value">{{ config.categoryName }}</div>
      </div>
      <div class="item">
        <div class="label">应用成效:</div>
        <div class="value">{{ config.effect }}</div>
      </div>
      <div class="item">
        <div class="label">产品提供方:</div>
        <div class="value">{{ config.pdProvider }}</div>
      </div>
      <div class="item">
        <div class="label">产品URL:</div>
        <div class="value link" @click="goDetail(config.pdUrl)">
          {{ config.pdUrl }}
        </div>
      </div>
      <div class="item">
        <div class="label">图片:</div>
        <div class="value">
          <img :src="config.pdImage" alt="Base64 Image" />
        </div>
      </div>
      <div class="item">
        <div class="label">状态:</div>
        <div class="value state flex">
          <div :class="`state-${config.pdState}`"></div>
          <div>{{ stateEnum[config.pdState] }}</div>
        </div>
      </div>
      <div class="item">
        <div class="label">创建人:</div>
        <div class="value">{{ config.createUser }}</div>
      </div>
      <div class="item">
        <div class="label">创建时间:</div>
        <div class="value">{{ config.createTime }}</div>
      </div>
    </BaseDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { ProductDetail } from "@/apis/maintenance";
import { ProductDetailRes } from "@/model/maintenance";
const props = withDefaults(
  defineProps<{
    visible: boolean;
    id: string;
  }>(),
  {
    visible: false,
    id: "",
  }
);

let config = reactive<ProductDetailRes>({
  categoryName: "",
  createTime: "",
  createUser: "",
  effect: "",
  id: 0,
  pdDesc: "",
  pdImage: "",
  pdName: "",
  pdProvider: "",
  pdState: true,
  pdUrl: "",
});

const emit = defineEmits(["close"]);

const state = ref(1);

const stateEnum = {
  true: "已上架",
  false: "待上架",
};

const getDetail = (id: string) => {
  ProductDetail({ id }).then((res) => {
    for (let key in config) {
      config[key] = res.data[key];
    }
  });
};

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      getDetail(props.id);
    }
  }
);

const goDetail = (url: string) => {
  if (url.includes("http")) {
    window.open(url, "_blank");
  } else {
    console.log(location, "location.protocol");
    const path = new URL("/111", `${location.protocol}//${location.hostname}`);
    window.open(path.href, "_blank");
  }
  // window.open(`${location.protocol}//${config.pdUrl}`, "_blank");
};

const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.product-detail {
  :deep(.base-drawer) {
    .item {
      display: flex;
      font-size: $font-size-m;
      color: rgba(41, 51, 78, 0.85);
      line-height: $height-m;
      align-items: flex-start;
      margin-bottom: $spacing-m;
      .label {
        margin-right: $spacing-s;
        width: 96px;
        text-align: right;
      }
      .value {
        max-width: calc(100% - 105px);
        img {
          width: 320px;
          height: auto;
        }
      }
      .link {
        @include color("blue");
        cursor: pointer;
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
</style>
