<template>
  <div id="layout-menu" v-show="showMenu">
    <el-menu router :default-active="defaultActive" @select="onChangeMenu">
      <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { MenuItem } from "@/layout/components";
import { RouterMenus } from "@/router";
import { cloneDeep } from "lodash";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const Route = useRoute();
const Router = useRouter();
// 当前激活菜单
const defaultActive = ref("");

const menuList = ref<any[]>([]);

const showMenu = computed(() => {
  return menuList.value.some((item) => item.show);
});

function menuListFilter(list) {
  return list.map((item: any) => {
    let bool = true;
    item.children && (item.children = menuListFilter(item.children));
    item.show = bool;
    return item;
  });
}

function findMatchPath(menus, pathVal) {
  return menus.some((item) => {
    if (item.children?.length) {
      return findMatchPath(item.children, pathVal);
    } else {
      if (item.path === pathVal) {
        if (item.meta.hideInDev) {
          defaultActive.value = "";
        } else {
          defaultActive.value = item.meta.hideInMenu
            ? item.meta.parentPath
            : item.path;
        }
        return true;
      } else {
        return false;
      }
    }
  });
}

function matchPathArr(menus, pathArr) {
  menus.map((item) => {
    if (item.children?.length) {
      matchPathArr(item.children, pathArr);
    } else {
      item.show && pathArr.push(item.path);
    }
  });
}

// 监听路由变化
watch(
  () => Route.path,
  (pathVal) => {
    const menuKeys = Object.keys(RouterMenus).find((item) => {
      return findMatchPath(RouterMenus[item], pathVal);
    });

    console.log(
      "layout-menu",
      menuList.value,
      menuKeys,
      RouterMenus,
      menuKeys,
      RouterMenus[menuKeys]
    );

    if (menuKeys) {
      menuList.value = cloneDeep(RouterMenus[menuKeys]);
      console.log("999999999999999999", menuList.value);
      menuList.value = menuListFilter(cloneDeep(RouterMenus[menuKeys]));
      // const pathArr: string[] = [];
      // matchPathArr(menuList.value, pathArr);
      // // 当存在左侧菜单 并且菜单选中的项不在菜单路径中时，跳转到第一个
      // if (!pathArr.includes(defaultActive.value) && menuKeys) {
      //   Router.replace(pathArr[0]);
      // }
    }
  },
  { deep: true, immediate: true }
);
// 切换菜单
function onChangeMenu(key: string) {
  if (Route.path === key) return;
  defaultActive.value = Route.path;
}
</script>

<style lang="scss">
#layout-menu {
  width: 200px;
  padding: $spacing-s;
  box-sizing: border-box;
  @include bgColor("bg");
  .el-menu {
    border-right: 0;
    margin-top: $spacing-s;
    width: 220px;
    @include bgColor("bg");
  }
}
html.dark {
  #layout-menu {
    @include bgColor("interactive-bg");
    .el-menu {
      @include bgColor("interactive-bg");
    }
  }
}
</style>
