<template>
  <div
    id="layout-header"
    :class="{
      index: isIndex,
    }"
  >
    <div class="header-left">
      <div class="logo-image"></div>
      <div class="logo-title"></div>
    </div>
    <div class="header-right">
      <UserDrop></UserDrop>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const Router = useRouter();

const currentModule = computed(() => {
  return Router.currentRoute.value.matched[0].name;
});

const currentChildModule = computed(() => {
  return Router.currentRoute.value.matched[1].name;
});

const isIndex = computed(
  () => currentModule.value === "home" && currentChildModule.value === "index"
);
</script>

<style lang="scss">
#layout-header {
  width: 100%;
  height: 48px;
  @include bgColor("bg");
  @include color("title");
  box-sizing: border-box;
  @include flex;
  position: relative;
  z-index: 10;
  // &.index {
  //   background-color: transparent;
  //   color: white;
  // }

  .mask-layer {
    position: fixed;
    left: 0;
    top: 48px;
    width: 100vw;
    height: calc(100vh - 48px);
    @include bgColor("bg");
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-left {
    @include flex(left);

    .menu {
      width: 48px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      @include bgColor("blue");
      &:hover {
        @include bgColor("blue-6");
      }
      &:active {
        @include bgColor("blue-5");
      }
      cursor: pointer;
      > img {
        top: 5px;
        position: relative;
      }
    }

    .router-drawer-overlay {
      top: 48px;
      height: calc(100vh - 48px);
      .el-drawer__body {
        @include bgColor("bg");
        padding: $spacing-l 0 0 0;
        .router-drawer-menu-item {
          font-size: $font-size-m;
          @include flex(left);
          width: 100%;
          height: 40px;
          margin-left: 0;
          border-radius: 0;
          padding: $spacing-s $spacing-l;
          > span {
            margin-left: $spacing-l;
            line-height: 22px;
          }
        }
      }
    }
    .logo-image {
      @include background_image_mixin("header_logo_image", 130px, 20px);
      margin-left: $spacing-l;
    }
    .logo-title {
      margin-left: $spacing-l;
      font-size: $font-size-xl;
      font-weight: 500;
    }

    .env-check {
      margin-left: $spacing-s;
      font-size: $font-size-s;
    }

    .header-left-title-gap {
      margin: 0 $spacing-s;
      width: 4px;
      height: 4px;
      border-radius: 4px;
      @include bgColor("title");
    }
    .header-left-title {
      font-size: $font-size-l;
    }

    .change-select.el-select {
      margin-left: $spacing-l;

      .el-input__inner {
        border: none;
        outline: none;
      }
      .el-input__wrapper {
        background-color: transparent;
        box-shadow: none;
        &.is-focus {
          box-shadow: none !important;
        }
      }
      .el-input.is-focus {
        .el-input__wrapper {
          box-shadow: none !important;
        }
      }
    }
    .change-project,
    .change-region {
      width: 160px;
    }
    .change-env {
      width: 100px;
    }
    .nav-menu {
      margin-left: $spacing-l;
      @include flex;
      .menu-item {
        &.active-menu,
        &:hover,
        &:active {
          @include bgColor("gray-2");
        }
        padding: 6px 8px;
        cursor: pointer;
        margin: 0 4px;
        border-radius: $radius-m;
        .item {
          @include flex;
          font-size: $font-size-m;
          .svg {
            margin-right: 8px;
          }
        }

        .menu-item-more {
          display: inline-flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: $font-size-m;
          @include color("title");

          .iconfont {
            margin-right: $spacing-s;
          }
        }
      }
    }
  }

  .header-right {
    @include flex(flex-end);

    .change-model {
      margin-left: $spacing-l;
      font-size: $font-size-m;
      @include flex(left);

      .model-title {
        margin-right: 6px;
      }

      .go-image {
        @include background_image_mixin("header_go_image", 10px, 10px);
      }
    }

    .project-guide {
      // margin: 0 $spacing-l;
      margin: 0 $spacing-s;
      cursor: pointer;
    }
  }
}
</style>
