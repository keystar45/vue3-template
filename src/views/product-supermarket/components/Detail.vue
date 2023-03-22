<template>
  <div class="detail">
    <nav>
      <div class="left flex">
        <BaseSvg icon="icon-jiantou-zuo" @click="goBack" />
        <div>{{ name }}</div>
      </div>
      <BaseButton type="primary" @click="goDetail">
        <BaseSvg icon="icon-a-xiangqingchakan" />
        查看大屏</BaseButton
      >
    </nav>
    <div class="content">
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
        <div class="label">图片:</div>
        <div class="value">
          <img
            src="https://img2.baidu.com/it/u=3164536069,133996720&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"
            alt="Base64 Image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const goBack = () => {
  emit("back");
};

const goDetail = () => {
  window.open("https://github.com/vuejs/devtools", "_blank");
};
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
