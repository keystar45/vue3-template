<template>
  <header class="header">
    <div class="header-left flex">
      <div class="icon flex">
        <BaseSvg icon="icon-ningbodianlishujudizuologo" />
        <span>数据地图</span>
      </div>
      <div class="menu flex">
        <div
          class="menu-item flex"
          :class="{ 'is-active': menu.isActive }"
          v-for="menu in menuList"
          :key="menu.title"
        >
          <BaseSvg :icon="menu.icon" />
          <span>{{ menu.title }}</span>
        </div>
      </div>
    </div>
    <div class="header-right">
      <BaseButton type="primary">
        <BaseSvg icon="icon-shujushenqing" />
        数据申请</BaseButton
      >
      <el-dropdown popper-class="cpcs-popper" trigger="hover">
        <div class="button">
          <BaseSvg icon="icon-jinruxitong" />
          进入系统
          <BaseSvg icon="icon-jiantou-xia" colorType="below" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="Router.push('/login')"
              >宁波电力数据底座</el-dropdown-item
            >
            <el-dropdown-item>产品超市运维</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const Router = useRouter();

const menuList = [
  {
    icon: "icon-shujuzichan-daohang",
    title: "数据资源",
    isActive: false,
  },
  {
    icon: "icon-xiangmupeizhi-daohang",
    title: "产品超市",
    isActive: true,
  },
];
</script>

<style lang="scss" scoped>
.header {
  height: 48px;
  border-bottom: 1px solid #d6dde7;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    .icon {
      @include color("text");
      font-size: $font-size-xl;
      line-height: $height-m;
      margin-right: 50px;
      :deep(.svg) {
        color: #545c71;
        font-size: 24px;
        margin-right: $spacing-s;
      }
    }
    .menu {
      &-item {
        width: 86px;
        height: 28px;
        justify-content: center;
        margin-right: $spacing-l;
        :deep(.svg) {
          margin-right: 5px;
          color: #545c71;
        }
      }
      .is-active {
        background: rgba(41, 51, 78, 0.1);
        border-radius: 2px;
      }
    }
  }
  &-right {
    .button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 26px;
      white-space: nowrap;
      cursor: pointer;
      color: $light-white;
      text-align: center;
      box-sizing: border-box;
      transition: 0.1s;
      font-weight: var(--el-button-font-weight);
      user-select: none;
      background-color: $light-blue;
      padding: 8px 11px;
      font-size: 12px;
      border-radius: 2px;
      &:hover {
        background: $light-blue-6;
      }
      :deep(.svg) {
        color: #fff;
        margin-right: 4px;
      }
      :deep(.below) {
        margin-right: 0;
        margin-left: 4px;
      }
    }
    :deep(.base-button) {
      .svg {
        color: #fff;
        margin-right: 4px;
      }
      .below {
        margin-right: 0;
        margin-left: 4px;
      }
    }
    :deep(.el-dropdown) {
      margin-left: $spacing-m;
      .button:focus-visible {
        outline: none;
      }
    }
    :deep(.el-dropdown:focus-visible) {
      box-shadow: none;
      border: none;
    }
  }
}
</style>

<style lang="scss">
.cpcs-popper {
  .el-dropdown-menu__item {
    display: block;
    text-align: center;
  }
}
</style>
