<template>
  <div class="main-header">
    <div class="main-header_left">
      <div class="main-header_left_content">
        <BaseSvg
          icon="icon-jiantou-zuo"
          @click="goBack"
          v-if="lefeArrow"
          class="main-header_left_content_arrow"
        ></BaseSvg>
        <span class="main-header_left_content_title">{{ title }}</span>
      </div>
      <slot></slot>
    </div>

    <div class="main-header_right">
      <slot name="right"></slot>
      <div class="main-header_right_btnList">
        <el-button
          class="btn"
          v-for="(btn, index) in btnList"
          :key="index"
          :type="btn['type']"
          @click="btn['callback']"
          :plain="btn['plain']"
          >{{ (btn && btn["text"]) || "" }}</el-button
        >
        <!-- 存放其它类型的按钮 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
defineProps({
  lefeArrow: {
    type: Boolean,
    default: false,
  },
  title: String,
  btnList: {
    type: Array as () => {
      type: any;
      callback: () => void;
      plain: any;
      text: string;
    }[],
    default: () => [],
  },
});

function goBack() {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
html {
  .main-header {
    @include bgColor("interactive-bg");
  }
}
.main-header {
  height: 44px;
  @include borderBottom("border");
  box-sizing: border-box;
  &_left {
    float: left;
    @include flex();
    &_content {
      @include flex(center);
      height: 44px;
      margin-right: $spacing-l;

      &_title {
        font-size: $font-size-l;
        line-height: $height-l;
        font-weight: 400;
        @include color("title");
        margin-left: $spacing-l;
      }
      &_arrow {
        margin-left: 16px;
        cursor: pointer;
        @include color("title");
      }
    }
  }

  &_right {
    float: right;
    @include flex();

    &_btnList {
      @include flex(center);
      height: 44px;
      margin-right: $spacing-l;
    }
  }
}
</style>
