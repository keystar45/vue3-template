<template>
  <div class="layout-menu-item">
    <template v-for="(menu, index) in menuList">
      <el-sub-menu
        :key="menu.path"
        :index="menu.path"
        v-if="menu?.children && menu.show"
      >
        <template #title>
          <template v-if="menu.meta && menu.meta.icon && menu.meta.activeIcon">
            <BaseImg
              v-if="
                menu?.children.findIndex((item) => item.path === path) !== -1
              "
              :src="menu.meta.activeIcon"
              :width="16"
              :height="16"
            ></BaseImg>
            <BaseImg
              v-else
              :src="menu.meta.icon"
              :width="16"
              :height="16"
            ></BaseImg>
          </template>
          <span class="menu-title">
            <BeyondTooltip
              width="100%"
              :hide-after="0"
              :content="menu.meta?.title"
            />
          </span>
        </template>
        <div v-for="subMenu in menu.children" :key="subMenu.path">
          <el-menu-item v-if="subMenu.show" :index="subMenu.path">
            <template #title>
              <span class="menu-title">
                <BeyondTooltip
                  width="100%"
                  :hide-after="0"
                  :content="subMenu.meta?.title"
                />
              </span>
            </template>
          </el-menu-item>
        </div>
      </el-sub-menu>
      <el-menu-item
        :key="`${menu.path}${index}`"
        :index="menu.path"
        v-else-if="menu.show"
      >
        <template v-if="menu.meta && menu.meta.icon && menu.meta.activeIcon">
          <BaseImg
            v-if="menu.path === path"
            :src="menu.meta.activeIcon"
            :width="16"
            :height="16"
          ></BaseImg>
          <BaseImg
            v-else
            :src="menu.meta.icon"
            :width="16"
            :height="16"
          ></BaseImg>
          <span class="menu-title">
            <BeyondTooltip
              width="100%"
              :hide-after="0"
              :content="menu.meta?.title"
            />
          </span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

type menuItem = {
  path: string;
  meta: {
    activeIcon: string;
    icon: string;
    title: string;
  };
  show: boolean;
  children?: any[];
};
defineProps({
  menuList: {
    type: Array as () => Array<menuItem>,
    default: () => [],
  },
});

const Router = useRouter();
// 当前路由
const path = computed(() => {
  return Router.currentRoute.value.path;
});
</script>

<style lang="scss">
.layout-menu-item .el-menu.el-menu--inline .el-menu-item .menu-title {
  padding-left: 24px;
}
.el-menu {
  .el-menu-item {
    width: 100%;
    .menu-title {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
.layout-menu-item {
  width: 184px;
  .el-sub-menu__title,
  .el-menu-item {
    font-size: $font-size-m;
    line-height: $height-xxl;
    height: $height-xxl;
    line-height: $height-xxl;
    padding-left: $spacing-s !important;
    border-radius: $radius-m;
  }
  .menu-title {
    padding-left: $spacing-s;
  }
  .el-menu-item {
    &.is-active,
    &:active,
    &:hover {
      @include bgColor("text-1");
      .menu-title {
        @include color("white");
      }
    }
  }
  .el-menu.el-menu--inline {
    .el-menu-item {
      &.is-active,
      &:active,
      &:hover {
        background: transparent;
        .menu-title {
          @include color("blue-4");
        }
      }
    }
  }
  .el-sub-menu {
    &.is-active,
    &:active,
    &:hover {
      .el-sub-menu__title {
        @include bgColor("text-1");
        @include color("white");
        .menu-title {
          @include color("white");
        }
      }
    }
  }
}

html.dark {
  .layout-menu-item {
    .el-menu-item {
      &.is-active,
      &:active,
      &:hover {
        @include bgColor("blue");
        .menu-title {
          @include color("title");
        }
      }
    }
    .el-menu.el-menu--inline {
      .el-menu-item {
        &.is-active,
        &:active,
        &:hover {
          background: transparent;
          .menu-title {
            @include color("blue-4");
          }
        }
      }
    }
    .el-sub-menu {
      &.is-active,
      &:active,
      &:hover {
        .el-sub-menu__title {
          @include bgColor("blue");
          @include color("title");
          .menu-title {
            @include color("title");
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.layout-menu-item {
  :deep(.el-menu) {
    width: 100% !important;
  }
  :deep(.el-sub-menu) {
    .el-sub-menu__title {
      .menu-title {
        padding-right: 30px;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
