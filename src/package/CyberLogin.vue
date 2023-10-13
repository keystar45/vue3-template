<template>
  <div class="cyber-login">
    <div class="login-img" ref="imgBox"></div>
    <div class="login-content">
      <div class="login-content-logo">
        <BaseImg src="CyberData.png`" width="auto" :height="48"></BaseImg>
      </div>
      <div class="login-content-form">
        <div class="form-title">Hello! 欢迎回来</div>
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
                <svg :class="['svg']" aria-hidden="true">
                  <use :xlink:href="`#${'icon-yonghuming'}`"></use>
                </svg>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
              :show-password="true"
              @keyup.enter="Login()"
            >
              <template #prepend>
                <svg :class="['svg']" aria-hidden="true">
                  <use :xlink:href="`#${'icon-mima'}`"></use>
                </svg>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Login()"> 登录 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-switch-language">
      <SwitchLanguage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const formRef = ref();

const loginForm = ref({
  name: "",
  password: "",
});

const rules = ref({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const Login = () => {
  window.localStorage.clear();
};

const imgBox = ref();
onMounted(() => {
  const h = document.documentElement.clientHeight;
  const bi = 900 / h;
  imgBox.value.style.width = 560 / bi + "px";
});
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  .el-input__inner {
    font-size: 16px;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background-color: transparent;
    transition: background-color 50000s ease-in-out 0s;
  }

  input::-webkit-input-placeholder {
    color: rgba(41, 52, 78, 0.3);
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(41, 52, 78, 0.3);
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(41, 52, 78, 0.3);
  }
}

.cyber-login {
  height: 100%;
  display: flex;
  min-height: 580px;
  .login-img {
    width: 40%;
    height: 100%;
    background: url("/src/assets/CyberData.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    img {
      height: 27px;
      padding: 25px 39px;
    }
  }

  .login-content {
    flex: 1;
    background: #ffffff;

    .login-content-logo {
      padding: 0 30px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #6283ff;
      line-height: 33px;
      height: 93px;
      display: flex;
      align-items: center;
    }

    .login-content-form {
      margin: 143px auto 0;
      width: 340px;

      .form-title {
        margin-bottom: 32px;
      }

      :deep(.el-form) {
        .el-form-item {
          margin: 26px 0;
        }

        .el-input {
          background: #f2f4f9;
          max-width: none;
          .el-input-group__prepend {
            background: #f2f4f9;
            .svg {
              display: inline-flex;
              align-items: center;
              width: 1em;
              height: 1em;
              fill: currentColor;
              overflow: hidden;
              outline: none;
              cursor: pointer;
              flex-shrink: 0;
              font-size: 14px;
            }
          }
        }

        .el-input__wrapper {
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .el-form-item__error {
          padding: 3px 0 0 14px;
        }

        .el-input-group__prepend {
          padding: 18px 0 18px 19px;
          height: 56px;
          box-sizing: border-box;
          border: none;
          box-shadow: none;

          img {
            width: 14px;
          }
        }

        .el-form-item__content .el-input .el-input__inner {
          height: 56px;
          line-height: 56px;
          border: none;
        }

        .el-form-item__content .el-button {
          width: 100%;
          height: 56px;
          line-height: 56px;
          border-radius: 4px;
          border: none;
          margin-top: 26px;
          letter-spacing: 2px;
        }

        .el-form-item__content .el-button .el-button__text--expand {
          letter-spacing: 2px;
        }
      }
    }
  }
  .login-switch-language {
    position: absolute;
    right: 30px;
    top: 25px;
  }
}
</style>
