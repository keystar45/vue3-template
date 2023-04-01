<template>
  <section id="layout-content">
    <router-view v-if="!props.noAuth" :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <NoAuthTip v-else />
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import NoAuthTip from "./NoAuthTip.vue";

const props = defineProps({
  noAuth: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();
const key = computed(() => route.path);
</script>

<style lang="scss">
#layout-content {
  flex: 1;
  position: relative;
  @include bgColor("bg");
  min-width: 800px;
}
html.dark {
  #layout-content {
    padding-left: 8px;
  }
}
</style>
