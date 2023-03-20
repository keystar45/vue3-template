<template>
  <div class="delete-dialog">
    <BaseDialog
      width="360px"
      :title="operateEnum[operate]"
      :dialogVisible="visible"
      :submitLoading="submitLoading"
      @confirm="deleteConfirm"
      @cancel="deleteCancel"
    >
      <div class="content" v-if="operate === 1">
        <BaseSvg icon="icon-tishi1" colorType="blue" />
        <div class="text">
          {{ `确定要上架产品"${title}"吗？` }}
        </div>
      </div>
      <div class="content" v-if="operate === 2">
        <BaseSvg icon="icon-jinggaotishi" colorType="warn" />
        <div class="text">
          {{ `确定要下架产品"${title}"吗？` }}
        </div>
      </div>
      <div class="content" v-if="operate === 3">
        <BaseSvg icon="icon-jinggaotishi" colorType="warn" />
        <div class="text">
          {{ `确定要删除产品"${title}"吗？` }}
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
withDefaults(
  defineProps<{
    operate: 1 | 2 | 3 | number;
    visible: boolean;
    title: string;
  }>(),
  {
    visible: false,
    operate: 1,
    title: "",
  }
);

const operateEnum = {
  1: "上架",
  2: "下架",
  3: "删除",
};

const submitLoading = ref(false);

const emit = defineEmits(["close"]);

const deleteConfirm = () => {
  submitLoading.value = true;
};

const deleteCancel = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.delete-dialog {
  :deep(.base-dialog) {
    .content {
      display: flex;
      align-items: flex-start;
      color: rgba(41, 51, 78, 0.85);
      line-height: $height-m;
      justify-content: center;
      .svg {
        margin-right: $spacing-xs;
        height: $height-m;
      }
    }
  }
}
</style>
