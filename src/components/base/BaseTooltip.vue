<template>
  <el-tooltip
    :append-to="appendTo"
    :content="content"
    :raw-content="rawContent"
    :placement="placement"
    :disabled="disabled"
    :offset="offset"
    :transition="transition"
    :popper-options="popperOptions"
    :show-after="showAfter"
    :show-arrow="showArrow"
    :hide-after="hideAfter"
    :auto-close="autoClose"
    :manual="manual"
    :popper-class="intoPopperClass"
    :enterable="enterable"
    :tabindex="tabindex"
    :teleported="teleported"
    :trigger="trigger"
    :virtual-triggering="virtualTriggering"
    :virtual-ref="virtualRef"
    :trigger-keys="triggerKeys"
  >
    <slot></slot>
    <template #content><slot name="content"></slot></template>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  appendTo: String || HTMLElement,
  content: String,
  rawContent: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: "bottom",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  offset: Number,
  transition: String,
  popperOptions: Object,
  showAfter: Number,
  showArrow: {
    type: Boolean,
    default: true,
  },
  hideAfter: Number,
  autoClose: Number,
  manual: {
    type: Boolean,
    default: false,
  },
  popperClass: String,
  enterable: {
    type: Boolean,
    default: true,
  },
  tabindex: Number,
  teleported: {
    type: Boolean,
    default: true,
  },
  trigger: {
    type: String,
    default: "hover",
  },
  virtualTriggering: {
    type: Boolean,
    default: false,
  },
  virtualRef: HTMLElement,
  triggerKeys: Array,
});
const intoPopperClass = computed(() => {
  return `${props.popperClass || ""} base-tooltip`;
});
</script>
<style lang="scss">
html {
  .el-popper.base-tooltip {
    max-width: 500px;
    color: var(--color--text) !important;
    background-color: var(--color--white) !important;
    border: 1px solid var(--color--white) !important;
    @include boxShadow();
    box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
      0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
    .el-popper__arrow {
      &:before {
        border: 1px solid var(--color--white) !important;
        background: var(--color--white) !important;
      }
    }
    &.url-tooltip {
      .tooltip-content,
      .copy {
        display: flex;
        align-items: center;

        .svg {
          margin: 0 4px 0 12px;
        }
      }

      .copy {
        @include color("blue");
        cursor: pointer;
      }
    }
  }
}
html.dark {
  .el-popper.base-tooltip {
    background-color: var(--color--interactive-active-bg) !important;
    border: 1px solid var(--color--interactive-active-bg) !important;
    box-shadow: 0px 1px 6px 0px rgba(13, 17, 27, 0.6);
    .el-popper__arrow {
      &:before {
        border: 1px solid var(--color--interactive-active-bg) !important;
        background: var(--color--interactive-active-bg) !important;
      }
    }
  }
}
</style>
