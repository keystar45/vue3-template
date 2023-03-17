<template>
  <div class="update-pwd">
    <BaseDialog
      title="修改密码"
      :width="'480px'"
      :dialogVisible="visible"
      :submitLoading="submitLoading"
      @confirm="updateConfirm"
      @cancel="updateCancel"
    >
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const submitLoading = ref(false);

const updateConfirm = () => {
  submitLoading.value = true;
  setTimeout(() => {
    submitLoading.value = false;
    emit("close");
  }, 2000);
};

const updateCancel = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.update-pwd {
}
</style>
