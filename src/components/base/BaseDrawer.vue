<template>
  <div class="base-drawer" ref="drawerRef">
    <div class="base-drawer_body" ref="drawerBodyRef">
      <div class="base-drawer_body_container" :style="`width: ${width}`">
        <div class="base-drawer_body_container_head">
          <div class="base-drawer_body_container_title">{{ title }}</div>
          <svg
            t="1658973522684"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7646"
            width="14"
            height="14"
            @click="closeDrawer"
          >
            <path
              d="M263.808 173.312l261.12 261.12 261.248-261.12a19.2 19.2 0 0 1 27.136 0l63.36 63.36a19.2 19.2 0 0 1 0 27.136l-261.184 261.12 261.12 261.248a19.2 19.2 0 0 1 0 27.136l-63.36 63.36a19.2 19.2 0 0 1-27.072 0L524.928 615.488l-261.12 261.12a19.2 19.2 0 0 1-27.136 0l-63.36-63.36a19.2 19.2 0 0 1 0-27.072l261.12-261.248-261.12-261.12a19.2 19.2 0 0 1 0-27.136l63.36-63.36a19.2 19.2 0 0 1 27.136 0z"
              p-id="7647"
              fill="rgba(255, 255, 255, 0.6)"
            ></path>
          </svg>
        </div>
        <div
          :class="`base-drawer_body_container_content${
            showFoot ? ' has-foot' : ''
          }`"
        >
          <slot></slot>
        </div>
        <div class="base-drawer_body_container_foot flex" v-if="showFoot">
          <BaseButton
            type="primary"
            @click="submitDrawer"
            v-if="showSubmit"
            :loading="submitLoading"
            >{{ submitText }}</BaseButton
          >
          <BaseButton @click="closeDrawer">{{ cancelText }}</BaseButton>
        </div>
      </div>
    </div>
    <div class="base-drawer_overlay" v-if="showOverlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ElLoading } from "element-plus";
import { nextTick, ref, watch } from "vue";
const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  width: {
    type: String,
    default: "640px",
  },
  showFoot: {
    type: Boolean,
    default: false,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  showSubmit: {
    type: Boolean,
    default: true,
  },
  submitLoading: {
    type: Boolean,
    default: false,
  },
  submitText: {
    type: String,
    default: "确认",
  },
  cancelText: {
    type: String,
    default: "取消",
  },
});

const drawerRef = ref();
const drawerBodyRef = ref();

watch(
  () => props.dialogVisible,
  (newVal) => {
    nextTick(() => {
      if (newVal) {
        drawerRef.value.style.width = props.showOverlay ? "100vw" : props.width;
        drawerBodyRef.value.style.width = props.width;
      } else {
        drawerBodyRef.value.style.width = "0px";
        setTimeout(() => {
          drawerRef.value.style.width = "0";
          closeLoad();
        }, 240);
      }
    });
  },
  { immediate: true }
);

const emit = defineEmits(["cancel", "confirm"]);

const closeDrawer = () => {
  emit("cancel");
};

const submitDrawer = () => {
  emit("confirm");
};
const Load = ref();
const openLoad = () => {
  Load.value = ElLoading.service({
    target: drawerBodyRef.value,
  });
};

const closeLoad = () => {
  if (Load.value) {
    Load.value.close();
  }
};

defineExpose({
  openLoad,
  closeLoad,
});
</script>

<style lang="scss" scoped>
.base-drawer {
  top: 0;
  right: 0;
  height: 100vh;
  position: fixed;
  z-index: 2000;
  overflow: hidden;
  width: 0;
  &_body {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.24s ease-in-out;
    width: 0;
    &_container {
      height: 100%;
      @include boxShadow();
      @include borderLeft("border");
      &_head {
        height: 44px;
        @include bgColor("gray-8");
        padding: 0 $spacing-l;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        font-size: $font-size-l;
        font-weight: 600;
        @include color("title");
        justify-content: space-between;
        @include borderBottom("border");
        svg {
          cursor: pointer;
          path {
            fill: var(--el-color-info);
          }
          &:hover {
            path {
              fill: #6283ff;
            }
          }
        }
      }
      &_content {
        overflow-y: auto;
        overflow-y: overlay;
        height: calc(100% - 44px);
        @include bgColor("interactive-bg");
        box-sizing: border-box;
        padding: $spacing-l;
        &.has-foot {
          height: calc(100% - 44px - 44px);
        }
      }
      &_foot {
        height: 44px;
        padding: 0 $spacing-l;
        @include bgColor("interactive-bg");
        @include borderTop("border");
        justify-content: flex-end;
      }
    }
  }
  &_overlay {
    width: 100%;
    height: 100%;
    @include bgColor("overlay-bg");
  }
}
</style>
