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
        <div class="value">xxxx</div>
      </div>
      <div class="item">
        <div class="label">产品描述:</div>
        <div class="value">
          xxxhghjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhx
        </div>
      </div>
      <div class="item">
        <div class="label">专题库:</div>
        <div class="value">xxxx</div>
      </div>
      <div class="item">
        <div class="label">应用成效:</div>
        <div class="value">xxxx</div>
      </div>
      <div class="item">
        <div class="label">产品提供方:</div>
        <div class="value">xxxx</div>
      </div>
      <div class="item">
        <div class="label">产品URL:</div>
        <div class="value link" @click="goDetail">
          http://172.18.1.146:30001/#/dataScreen/dataBase
        </div>
      </div>
      <div class="item">
        <div class="label">图片:</div>
        <div class="value">
          <img
            src="https://img2.baidu.com/it/u=3164536069,133996720&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"
            alt="Base64 Image"
          />
        </div>
      </div>
      <div class="item">
        <div class="label">状态:</div>
        <div class="value state flex">
          <div :class="`state-${state}`"></div>
          <div>{{ stateEnum[state] }}</div>
        </div>
      </div>
      <div class="item">
        <div class="label">创建人:</div>
        <div class="value">xxxx</div>
      </div>
      <div class="item">
        <div class="label">创建时间:</div>
        <div class="value">xxxx</div>
      </div>
    </BaseDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
withDefaults(
  defineProps<{
    visible: boolean;
  }>(),
  {
    visible: false,
  }
);

const emit = defineEmits(["close"]);

const state = ref(1);

const stateEnum = {
  1: "已上架",
  2: "待上架",
};

const goDetail = () => {
  window.open("https://github.com/vuejs/devtools", "_blank");
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
      margin-bottom: $spacing-l;
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
</style>
