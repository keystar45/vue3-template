<template>
  <div class="update-pwd">
    <BaseDialog
      title="修改密码"
      width="480px"
      :dialogVisible="visible"
      :submitLoading="submitLoading"
      @confirm="updateConfirm"
      @cancel="updateCancel"
    >
      <el-form
        :model="config"
        label-width="110px"
        :rules="formRules"
        ref="formRef"
      >
        <el-form-item label="用户名:">
          <el-input
            :model-value="userName"
            :disabled="true"
            @focus="handleInClick"
          />
        </el-form-item>
        <el-form-item label="原密码:" prop="oldPwd">
          <el-input
            placeholder="请输入原密码"
            v-model="config.oldPwd"
            type="password"
            show-password
            :readonly="passwordFlag"
            @focus="handleInClick"
          />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPwd">
          <el-input
            placeholder="请输入新密码"
            v-model="config.newPwd"
            type="password"
            show-password
            :readonly="passwordFlag"
            @focus="handleInClick"
          />
        </el-form-item>
        <el-form-item label="确认新密码:" prop="newPwd2">
          <el-input
            placeholder="请再次输入新密码"
            v-model="config.newPwd2"
            type="password"
            show-password
            :readonly="passwordFlag"
            @focus="handleInClick"
          />
        </el-form-item>
      </el-form>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useUserStore } from "@/store";
import { UpdatePwd } from "@/apis/login";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const Router = useRouter();
const store = useUserStore();
const userName = computed(() => store.userName);
const emit = defineEmits(["close"]);

const submitLoading = ref(false);

const passwordFlag = ref(true);
const formRef = ref();
const config = reactive({
  oldPwd: "",
  newPwd: "",
  newPwd2: "",
});
const formRules = {
  oldPwd: {
    required: true,
    trigger: "blur",
    message: "请输入原密码",
  },
  newPwd: [
    {
      required: true,
      trigger: "blur",
      message: "请输入新密码",
    },
    {
      validator: (rule, val, callback) => {
        if (val === config.oldPwd)
          callback(new Error("新密码与旧密码不能一致"));
        callback();
      },
      required: true,
      trigger: "blur",
    },
  ],
  newPwd2: [
    {
      required: true,
      trigger: "blur",
      message: "请确认新密码",
    },
    {
      validator: (rule, val, callback) => {
        if (val !== config.newPwd) callback(new Error("两次密码不一致"));
        callback();
      },
      required: true,
      trigger: "blur",
    },
  ],
};

const handleInClick = () => {
  passwordFlag.value = false;
};

const updateConfirm = () => {
  formRef.value.validate((isValid) => {
    if (!isValid) return;
    submitLoading.value = true;
    UpdatePwd({
      oldPassword: config.oldPwd,
      password: config.newPwd,
    })
      .then(() => {
        ElMessage.success("密码修改成功");
        updateCancel();
        Router.replace("/login");
      })
      .finally(() => {
        submitLoading.value = false;
      });
  });
};

const updateCancel = () => {
  emit("close");
  formRef.value.resetFields();
};
</script>

<style lang="scss" scoped>
.update-pwd {
  :deep(.el-form) {
    .el-form-item {
      .el-input__suffix {
        .el-input__password {
          font-size: $font-size-l;
        }
      }
      &:last-child {
        margin-bottom: $spacing-m;
      }
    }
  }
}
</style>
