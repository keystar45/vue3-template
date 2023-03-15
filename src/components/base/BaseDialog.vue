<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    :width="width"
    :before-close="onCancel"
    :show-close="true"
    @open="onOpen"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    class="base-dialog"
  >
    <div ref="dialogRef"><slot></slot></div>
    <template #footer v-if="showFooter">
      <div v-if="!customFooter">
        <BaseButton
          v-if="showSubmit"
          :loading="submitLoading || loading"
          type="primary"
          :disabled="submitDisabled"
          @click="onConfirm"
          >{{ submitText ? submitText : "确认" }}</BaseButton
        >
        <BaseButton
          type=""
          @click="onCancel"
          plain
          v-if="isShowClose"
          :loading="loading"
          >{{ cancelText ? cancelText : "取消" }}</BaseButton
        >
      </div>
      <slot name="myFooter" v-else></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElLoading } from "element-plus";
import { debounce } from "lodash";
import { ref } from "vue";
import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  isShowClose: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "标题",
  },
  width: {
    type: String,
    default: "480px",
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  customFooter: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: "0",
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  showSubmit: {
    type: Boolean,
    default: true,
  },
  submitDisabled: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
  },
  submitText: {
    type: String,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
  submitLoading: {
    type: Boolean,
    default: false,
  },
});

const Load = ref();
const loading = ref(false);

const emit = defineEmits(["confirm", "cancel", "open"]);
const onConfirm = debounce(() => {
  emit("confirm");
}, 300);

const dialogRef = ref();

const onCancel = () => {
  emit("cancel");
};
const onOpen = () => {
  emit("open");
};

const openLoad = () => {
  loading.value = true;
  Load.value = ElLoading.service({
    target: dialogRef.value,
  });
};

const closeLoad = () => {
  loading.value = false;
  if (Load.value) {
    Load.value.close();
  }
};

defineExpose({
  openLoad,
  closeLoad,
});
</script>

<style lang="scss">
.base-dialog {
  @include color("title");
  .dialog-content {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .el-overlay-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-dialog {
    margin: auto;
    overflow: hidden;
  }

  .el-dialog__header {
    @include borderBottom("border");
    padding: $spacing-m $spacing-l $spacing-s $spacing-l;
    @include bgColor("dialog-header-bg");
    font-weight: 600;
    margin: 0;
    .el-dialog__headerbtn {
      top: 3px;
      height: 40px;
      width: 40px;
    }
  }

  .el-dialog__body {
    padding: $spacing-xxl $spacing-xl;
    max-height: 500px;
    overflow-y: auto;
    @include bgColor("dialog-bg");
    @include color("text");
    .dialog-body-title {
      display: flex;
      justify-content: center;
      font-size: $font-size-l;
      align-items: center;
      margin: $spacing-m 0 $spacing-l;

      .base-image {
        margin-right: $spacing-xs;
      }
    }
    .dialog-body-content {
      padding: 0 $spacing-l;
      margin-bottom: $spacing-l;
      font-size: $font-size-m;
      line-height: $height-m;
    }
  }

  .el-dialog__footer {
    @include borderTop("border");
    padding: $spacing-s $spacing-l;
    @include bgColor("dialog-bg");
    .base-button {
      font-size: $font-size-m;
    }
  }
}
</style>
