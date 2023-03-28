<template>
  <BaseDialog
    :title="props.title"
    :width="'400px'"
    :dialogVisible="props.visible"
    @confirm="deleteConfirm"
    @cancel="deleteCancel"
  >
    <div class="top">
      <BaseImg :src="'project/warn.png'" :width="16" :height="16" />
      <span>{{ props.topTip }}</span>
    </div>
    <div class="text" v-if="props.bottomTip">
      {{ props.bottomTip }}
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "删除",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  topTip: {
    type: String,
    default: "",
  },
  bottomTip: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["close", "confirm"]);

const deleteCancel = () => {
  emits("close");
};

const deleteConfirm = () => {
  emits("confirm");
};
</script>

<style lang="scss" scoped>
.el-dialog__body {
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-l;

    .base-image {
      margin-right: 3px;
    }
  }

  .text {
    font-size: $font-size-m;
    @include color("text-3");
    margin-top: $spacing-l;
    padding: 0 $spacing-l;
    text-align: center;
  }
}
</style>
