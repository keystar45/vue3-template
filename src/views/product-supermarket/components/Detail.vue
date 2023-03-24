<template>
  <div class="detail">
    <nav>
      <div class="left flex">
        <BaseSvg icon="icon-jiantou-zuo" @click="goBack" />
        <div>{{ name }}</div>
      </div>
      <BaseButton type="primary" @click="goDetail(config.pdUrl)">
        <BaseSvg icon="icon-a-xiangqingchakan" />
        查看大屏</BaseButton
      >
    </nav>
    <div class="content">
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
        <div class="label">图片:</div>
        <div class="value">
          <img :src="config.pdImage" alt="Base64 Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Detail } from "@/apis/supermarket";
withDefaults(
  defineProps<{
    id: string;
    name: string;
  }>(),
  {
    id: "",
    name: "",
  }
);

const emit = defineEmits(["back"]);

const config = reactive({
  pdDesc: "",
  categoryName: "",
  effect: "",
  pdProvider: "",
  pdImage: "",
  pdUrl: "",
});

const getDetail = (id: string) => {
  Detail({
    id,
  }).then((res) => {
    for (let key in config) {
      config[key] = res.data[key];
    }
  });
};

const goBack = () => {
  emit("back");
};

const goDetail = (url: string) => {
  console.log("111111111", url);
  if (url.includes("http")) {
    window.open(url, "_blank");
  } else {
    console.log(location, "location.protocol");
    const path = new URL(url, `${location.protocol}//${location.hostname}`);
    window.open(path.href, "_blank");
  }
  // window.open(`${location.protocol}//${config.pdUrl}`, "_blank");
};

defineExpose({
  getDetail,
});
</script>

<style lang="scss" scoped>
.detail {
  height: 100%;
  flex: 1;
  overflow: hidden;
  @include bgColor("white");
  display: flex;
  flex-direction: column;
  overflow: hidden;
  nav {
    height: 44px;
    padding: 0 $spacing-l;
    border-bottom: 1px solid rgba(41, 52, 78, 0.15);
    color: #29344e;
    font-size: $font-size-l;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $font-size-l;
    color: #29344e;
    :deep(.svg) {
      font-size: 22px;
      margin-right: $spacing-s;
    }
    :deep(.base-button) {
      .svg {
        font-size: $font-size-l;
        color: #fff;
        margin-right: $spacing-xs;
      }
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    padding: $spacing-l;
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
    }
  }
}
</style>
