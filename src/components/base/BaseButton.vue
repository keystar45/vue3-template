<template>
  <el-button
    :class="intoClass"
    :size="size"
    :type="type"
    :plain="plain"
    :link="link"
    :text="text"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :loading-icon="Eleme"
    v-throttle="onClick"
    v-if="throttleFlag"
  >
    <slot></slot>
  </el-button>
  <el-button
    :class="intoClass"
    :size="size"
    :type="type"
    :plain="plain"
    :link="link"
    :round="round"
    :circle="circle"
    :text="text"
    :loading="loading"
    :disabled="disabled"
    :loading-icon="Eleme"
    @click="onClick"
    v-else
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { Eleme } from "@element-plus/icons-vue";
import { computed } from "vue";
const props = defineProps({
  size: {
    type: String,
    default: "default",
  },
  type: {
    type: String,
    default: "",
  },
  plain: {
    type: Boolean,
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  class: {
    type: [Array, String],
    default: "base-button",
  },
  // 是否使用节流
  throttleFlag: {
    type: Boolean,
    default: true,
  },
});

const intoClass = computed(() => {
  return props.type === ""
    ? `${props.class} normal base-button`
    : `${props.class} base-button`;
});

const emit = defineEmits(["click"]);
const onClick = () => {
  emit("click");
};
</script>
<style lang="scss">
html {
  .el-button {
    min-width: 56px;
    &.is-link {
      min-width: auto;
    }
    &.icon_btn {
      min-width: auto;
      width: 36px;
    }
  }
  .el-button.normal {
    @include color("blue-4");
    @include borderColor("blue-4");
    background-color: transparent;
    &:hover {
      @include color("blue-6");
      @include borderColor("blue-6");
      background-color: rgba(86, 122, 255, 0.1);
      &.is-disabled {
        background-color: transparent;
      }
    }
    &:active {
      @include color("blue-5");
      @include borderColor("blue-5");
      background-color: rgba(77, 111, 237, 0.1);
      &.is-disabled {
        background-color: transparent;
      }
    }
  }
  .el-button.is-link.normal {
    color: var(--el-button-text-color);
    border-color: transparent;
    background: transparent;
    &:not(.is-disabled):hover {
      @include color("blue-6");
      background: transparent;
      border-color: transparent;
    }
    &:active {
      @include color("blue-5");
      border-color: transparent;
      background: transparent;
      &.is-disabled {
        color: var(--el-button-text-color);
      }
    }
  }
  .el-button.is-text.normal {
    color: var(--el-button-text-color);
    &:not(.is-disabled):hover {
      color: var(--el-button-text-color);
    }
    &:active {
      color: var(--el-button-text-color);
    }
  }

  .el-button.is-text:not(.is-disabled):hover,
  .el-button.is-text:not(.is-disabled):focus {
    @include bgColor("gray-2");
  }
}

html.dark {
  .el-button.normal {
    background-color: transparent;
    &:hover {
      background-color: rgba(98, 131, 255, 0.15);
      &.is-disabled {
        background-color: transparent;
      }
    }
    &:active {
      background-color: rgba(83, 111, 217, 0.15);
      &.is-disabled {
        background-color: transparent;
      }
    }
  }
}
</style>
