<template>
  <div class="login">
    <div class="project-icon flex">
      <BaseSvg icon="icon-ningbodianlishujudizuologo" />
      <div class="title">产品超市运维</div>
    </div>
    <div class="login-content">
      <div class="login-content-form">
        <div class="form-title">用户登录</div>
        <el-form ref="formRef" :model="loginForm" :rules="rules">
          <el-form-item prop="name">
            <el-input
              v-model="loginForm.name"
              link
              autocomplete="off"
              placeholder="请输入用户名"
              @keyup.enter="Login()"
            >
              <template #prepend>
                <BaseSvg icon="icon-yonghuming" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
              @keyup.enter="Login()"
            >
              <template #prepend>
                <BaseSvg icon="icon-mima" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <BaseButton type="primary" @click="Login()">登录</BaseButton>
          </el-form-item>
        </el-form>
      </div>
      <BaseImg src="login/bg.png" :width="419" :height="500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { loginRequest } from "@/apis/login";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";

const store = useUserStore();

const Router = useRouter();

const loginForm = reactive({
  name: "",
  password: "",
});

const formRef = ref();

const rules = ref({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const Login = () => {
  formRef.value.validate((e: boolean) => {
    if (!e) return;
    loginRequest({
      userName: loginForm.name,
      password: loginForm.password,
    }).then((res) => {
      ElMessage.success("登录成功");
      store.setUserName(res.data.loginName);
      store.setToken(res.data.token);
      Router.push("/maintenance");
    });
  });
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #eff4fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .project-icon {
    position: absolute;
    top: 40px;
    left: 50px;
    :deep(.svg) {
      font-size: 32px;
      color: #545c71;
      margin-right: $spacing-l;
    }
    .title {
      font-size: 19px;
      color: #29344e;
    }
  }
  &-content {
    width: 900px;
    height: 500px;
    background: #ffffff;
    box-shadow: 0px 10px 40px 0px rgba(49, 55, 63, 0.06);
    border-radius: 4px;
    display: flex;
    &-form {
      width: 481px;
      padding: 80px 0 0 63px;
      box-sizing: border-box;
      .form-title {
        font-size: $font-size-xxl;
        color: #333333;
        margin-bottom: 32px;
      }
      :deep(.el-form) {
        .el-form-item {
          margin-bottom: 30px;
        }
        .el-input {
          height: 48px;
          font-size: $font-size-xl;
          width: 360px;
          max-width: 360px;
          .el-input-group__prepend {
            width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            .svg {
              color: #567aff;
              font-size: 18px;
            }
          }
        }
        .base-button {
          width: 360px;
          height: 48px;
          margin-top: 20px;
          font-size: $font-size-xxl;
        }
      }
    }
  }
}
</style>
