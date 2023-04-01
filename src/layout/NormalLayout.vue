<template>
  <div id="layout">
    <Header></Header>
    <div id="layout-container">
      <template v-if="!notLayoutMenu">
        <Menu v-if="!notMenu"></Menu>
        <Content :noAuth="noAuth"></Content>
      </template>
      <DataContent :noAuth="noAuth" v-else></DataContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Content, DataContent, Header, Menu } from "./components";

const Router = useRouter();
// 数据开发模块不展示全局菜单
const notLayoutMenu = computed(
  () => Router.currentRoute.value.meta.notLayoutMenu
);
const notMenu = computed(() => Router.currentRoute.value.meta.notMenu);

const noAuth = computed(() => {
  return true;
});
</script>

<style lang="scss">
#layout {
  height: 100%;
  min-width: 880px;
  #layout-container {
    display: flex;
    height: calc(100vh - 48px);
    @include bgColor("bg");
    overflow: hidden;
  }
}
</style>
