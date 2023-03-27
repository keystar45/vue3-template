<template>
  <div class="data-directory">
    <Header />
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path" v-if="keepAlive" />
      </keep-alive>
      <component :is="Component" :key="route.path" v-if="!keepAlive" />
    </router-view>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import { useRoute } from "vue-router";

const keepAlive = ref();

const route = useRoute();
watch(route, (newVal) => {
  keepAlive.value = route.meta?.keepAlive;
});
</script>

<style lang="scss" scoped>
.data-directory {
  height: 100%;
  @include bgColor("bg");
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .title {
    height: 54px;
    line-height: 54px;
    padding: 0 $spacing-l;
    @include color("title");
  }
}
</style>
