<template>
  <section id="data-content">
    <router-view v-if="!props.noAuth" v-slot="{ Component }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component"></component>
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
const key = computed(() => {
  return route.path;
});
</script>

<style lang="scss">
#data-content {
  width: 100%;
  position: relative;
  @include bgColor("bg");
  min-width: 800px;
  height: 100%;
}
</style>
