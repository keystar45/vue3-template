<template>
  <div class="cyber-login">
    <div class="login-img" ref="imgBox" v-if="title === 'UserCenter'">
      <el-carousel trigger="click" arrow="never" :interval="5000">
        <el-carousel-item v-for="el in carouselList" :key="el.title">
          <div
            class="login-img"
            :style="{
              backgroundImage: `url(${bgImg[el.title]})`,
            }"
          >
            <div class="title">{{ el.title }}</div>
            <div class="desc">{{ el.desc }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div
      class="login-img"
      :style="{ backgroundImage: `url(${bgImg[title]})` }"
      ref="imgBox"
      v-else
    >
      <div class="title">{{ tripartiteTitle || title }}</div>
      <div class="desc">{{ config?.[locale]?.[title]?.desc }}</div>
    </div>
    <div class="login-content">
      <div class="login-content-logo">
        <BaseImg :src="logo" width="auto" :height="48" />
      </div>
      <div class="login-content-form">
        <div class="form-title">
          <div>Hello!</div>
          <div>{{ config[locale].welcome }}</div>
        </div>
        <el-form ref="formRef" :model="loginForm" :rules="rules">
          <el-form-item prop="name">
            <el-input
              v-model="loginForm.name"
              link
              autocomplete="off"
              :disabled="loading"
              :placeholder="config[locale].usernameP"
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
              :placeholder="config[locale].passwordP"
              :disabled="loading"
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
            <el-button type="primary" :loading="loading" @click="Login()">
              {{ config[locale].login }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-switch-language">
      <div class="switch-language" v-if="useLocale">
        <el-tooltip
          :hide-after="200"
          effect="light"
          :content="'切换为中文'"
          placement="bottom"
        >
          <svg
            t="1677206987438"
            class="project-guide"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="22956"
            width="24"
            height="24"
            @click="updateLanguage"
            v-show="locale !== 'zh-CN'"
          >
            <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
              fill="#FFFFFF"
              p-id="22957"
            ></path>
            <path
              d="M234.752 317.098667V682.666667h272.384v-51.2h-212.48v-110.592h191.488v-51.2H294.656V368.298667h203.776v-51.2h-263.68zM695.04 410.794667c-15.872 0-30.208 3.072-43.52 9.728-12.8 6.144-24.576 15.872-34.816 28.16v-30.72h-58.368V682.666667h58.368v-159.232c2.048-20.992 9.216-37.376 21.504-48.64 10.752-10.24 23.552-15.36 37.888-15.36 39.936 0 59.904 21.504 59.904 65.024V682.666667h58.368v-163.328c0-72.704-33.28-108.544-99.328-108.544z"
              fill="#545C71"
              p-id="22958"
            ></path>
          </svg>
        </el-tooltip>
        <el-tooltip
          :hide-after="200"
          effect="light"
          :content="'Switch to English'"
          placement="bottom"
        >
          <svg
            t="1677206720300"
            class="project-guide"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="22805"
            width="24"
            height="24"
            @click="updateLanguage"
            v-show="locale === 'zh-CN'"
          >
            <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
              fill="#FFFFFF"
              p-id="22806"
            ></path>
            <path
              d="M484.352 259.754667V347.306667H303.104v249.856h53.76v-28.16h127.488v171.008h55.296v-171.008h128v28.16h53.76V347.306667h-181.76V259.754667h-55.296z m-127.488 257.024V399.530667h127.488v117.248H356.864z m182.784 0V399.530667h128v117.248h-128z"
              fill="#545C71"
              p-id="22807"
            ></path>
          </svg>
        </el-tooltip>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="config[locale].dialogTitle"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="content">
        <div
          v-for="el in enterList"
          :key="el.title"
          class="item"
          :class="{ disabled: !roleList.includes(el.role) }"
          @click="goDetail(el)"
        >
          <BaseImg :src="el.img" width="auto" :height="60" />
          <div class="title">{{ el.title }}</div>
          <div class="recently-used" v-if="recentlyUsed === el.title">
            {{ config[locale].recentlyUsed }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElTooltip,
  ElMessage,
  ElCarousel,
  ElCarouselItem,
  ElDialog,
} from "element-plus";
import BaseImg from "@/components/BaseImg.vue";
import config from "./config.json";
import { encrypt } from "./encryption";
import CyberData from "@/assets/CyberData.png";
import CyberEngine from "@/assets/CyberEngine.png";
import CyberAI from "@/assets/CyberAI.png";

const props = withDefaults(
  defineProps<{
    title: "CyberData" | "CyberEngine" | "CyberAI" | "UserCenter";
    useLocale: boolean;
    baseUrl: string;
    locale?: "zh-CN" | "en-US";
    tripartiteTitle?: string;
    logo?: string;
  }>(),
  {
    title: "UserCenter",
    useLocale: true,
    baseUrl: "http://172.18.1.146:30201",
    locale: "zh-CN",
    tripartiteTitle: "",
    logo: "logo.png",
  }
);

const formRef = ref();

const loginForm = reactive({
  name: "",
  password: "",
});

const loading = ref(false);

const dialogVisible = ref(false);

const recentlyUsed = localStorage.getItem("recentlyUsed") || "";

const roleList = ref(["1", "2", "3", "4"]);

const cdUrlObj = {
  dev: "http://172.18.1.146:30001/#/index",
  test: "http://172.18.1.146:30002/#/index",
  prod: "https://cybermeta.prod.datacyber.com/#/index",
  demo: "https://cybermeta.demo.datacyber.com/#/index",
};

const ceUrlObj = {
  dev: "http://172.18.5.31:30146/#/index",
  test: "http://172.18.1.121:30146/#/index",
  prod: "https://cyberengine.prod.datacyber.com/#/index",
  demo: "https://cyberengine.demo.datacyber.com/#/index",
};

const ciUrlObj = {
  dev: "http://172.18.1.125/cs-manage-test/#/login",
  test: "http://172.18.1.125/cs-manage-test/#/login",
  prod: "https://cyberai.prod.datacyber.com/#/login",
  demo: "https://cyberai.demo.datacyber.com/#/login",
};

const rules = ref({
  name: [
    {
      required: true,
      message: config[props.locale].usernameP,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: config[props.locale].passwordP,
      trigger: "blur",
    },
  ],
});

const carouselList = [
  {
    img: `url('/src/assets/CyberEngine.png')`,
    title: "CyberEngine",
    desc: config[props.locale].CyberEngine.desc,
  },
  {
    img: `url('/src/assets/CyberData.png')`,
    title: "CyberData",
    desc: config[props.locale].CyberData.desc,
  },
  {
    img: `url('/src/assets/CyberAI.png')`,
    title: "CyberAI",
    desc: config[props.locale].CyberAI.desc,
  },
];

const enterList = ref([
  {
    img: "CyberEngineEnter.png",
    title: "CyberEngine",
    role: "2",
    url: "",
  },
  {
    img: "CyberDataEnter.png",
    title: "CyberData",
    role: "3",
    url: "",
  },
  {
    img: "CyberAIEnter.png",
    title: "CyberAI",
    role: "4",
    url: "",
  },
]);

const bgImg = {
  CyberData: CyberData,
  CyberEngine: CyberEngine,
  CyberAI: CyberAI,
};

const emit = defineEmits(["updateLanguage", "loginSuccess"]);

watch(
  () => props.locale,
  () => {
    window.location.reload();
  }
);

const updateLanguage = () => {
  emit("updateLanguage", props.locale);
};

const getUserInfo = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("JwtToken", sessionStorage.getItem("jwtToken") || "");
  headers.append("lang", props.locale);
  if (props.title === "UserCenter") {
    headers.append("ProductKey", "CyberData,CyberEngine,CyberAI");
  } else {
    headers.append("ProductKey", props.title);
  }
  fetch(`${props.baseUrl}/user/getUserInfo`, {
    method: "POST",
    headers: headers || {
      "Content-Type": "application/json",
      JwtToken: sessionStorage.getItem("jwtToken"),
      ProductKey:
        props.title === "UserCenter"
          ? ["CyberData", "CyberAI", "CyberEngine"]
          : props.title,
      lang: props.locale,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.code === "200") {
        roleList.value = res.data.version;
        if (roleList.value.length === 1) {
          dialogVisible.value = true;
          const url = `${
            enterList.value[Number(roleList.value[0]) - 2].url
          }?jwtToken=${sessionStorage.getItem("jwtToken")}`;
          // window.open(url, "_self");
        } else {
          dialogVisible.value = true;
        }
      } else {
        ElMessage.error(res.msg);
      }
    })
    .catch((err) => {});
};

const loginRequest = () => {
  loading.value = true;
  fetch(`${props.baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      loginName: loginForm.name,
      password: encrypt(loginForm.password),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.code === "200") {
        const jwtToken = res?.data?.jwtToken;
        sessionStorage.setItem("jwtToken", jwtToken);
        if (props.title !== "UserCenter") {
          emit("loginSuccess", {
            title: props.title,
            jwtToken: jwtToken,
          });
        } else {
          getUserInfo();
        }
      } else {
        ElMessage.error(res.msg);
      }
    })
    .catch((err) => {})
    .finally(() => (loading.value = false));
};

const Login = () => {
  formRef.value.validate((f: boolean) => {
    if (!f) return;
    window.localStorage.clear();
    loginRequest();
  });
};

const goDetail = (el) => {
  if (!roleList.value.includes(el.role)) return;
  const url = `${el.url}?jwtToken=${sessionStorage.getItem("jwtToken")}`;
  window.open(url, "_self");
};

const imgBox = ref();
onMounted(() => {
  // const h = document.documentElement.clientHeight;
  // const bi = 900 / h;
  // imgBox.value.style.width = 560 / bi + "px";
  console.log(window, "window", window.origin);
  const url = window.origin;
  switch (url) {
    case "http://172.18.1.146:30011":
      enterList.value[0].url = ceUrlObj.dev;
      enterList.value[1].url = cdUrlObj.dev;
      enterList.value[2].url = ciUrlObj.dev;
      break;
    case "http://172.18.1.146:30012":
      enterList.value[0].url = ceUrlObj.test;
      enterList.value[1].url = cdUrlObj.test;
      enterList.value[2].url = ciUrlObj.test;
      break;
    case " http://172.18.6.21:30013":
      enterList.value[0].url = ceUrlObj.prod;
      enterList.value[1].url = cdUrlObj.prod;
      enterList.value[2].url = ciUrlObj.prod;
      break;
    default:
      enterList.value[0].url = ceUrlObj.demo;
      enterList.value[1].url = cdUrlObj.demo;
      enterList.value[2].url = ciUrlObj.demo;
  }
  if (window.location.hostname === "localhost") {
    enterList.value[0].url = ceUrlObj.dev;
    enterList.value[1].url = cdUrlObj.dev;
    enterList.value[2].url = ciUrlObj.dev;
  }
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
  font-family: PingFangSC-Regular, PingFang SC;
  .login-img {
    width: 37.5%;
    height: 100%;
    background: no-repeat;
    background-size: 100% 100%;
    position: relative;
    :deep(.el-carousel) {
      height: 100%;
      .el-carousel__container {
        height: 100%;
        .login-img {
          width: 100%;
        }
      }
      .el-carousel__indicators {
        bottom: 60px;
        .el-carousel__indicator {
          .el-carousel__button {
            width: 10px;
            height: 10px;
            background: #567aff;
            opacity: 0.3;
            border-radius: 5px;
          }
          &.is-active {
            .el-carousel__button {
              opacity: 1;
              width: 40px;
            }
          }
        }
      }
    }

    img {
      height: 27px;
      padding: 25px 39px;
    }
    .title {
      position: absolute;
      left: 50px;
      top: 120px;
      font-size: 32px;
      font-weight: 600;
      color: #29344e;
    }
    .desc {
      position: absolute;
      left: 50px;
      top: 180px;
      font-size: 20px;
      font-weight: 400;
      color: #29344e;
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
        margin-bottom: 30px;
        display: flex;
        color: #33394c;
        div:first-child {
          font-size: 24px;
          margin-right: 8px;
        }
        div:last-child {
          font-size: 16px;
          vertical-align: bottom;
          padding-top: 7px;
        }
      }

      :deep(.el-form) {
        .el-form-item {
          margin: 30px 0;
        }

        .el-input {
          background: #f2f4f9;
          width: 360px;
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
          margin-top: 20px;
          letter-spacing: 2px;
          background: rgba(71, 119, 255, 1);
          font-size: 16px;
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
    svg {
      box-shadow: 0px 4px 10px 0px rgba(41, 52, 78, 0.1);
      border-radius: 12px;
      cursor: pointer;
    }
  }
  :deep(.el-overlay) {
    .el-overlay-dialog {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-dialog {
      margin: 0;
      .el-dialog__header {
        height: 45px;
        background: rgba(239, 244, 250, 0.5);
        border-radius: 2px 2px 0px 0px;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #d6dde7;
        .el-dialog__title {
          font-size: 14px;
          line-height: 45px;
          padding-left: 15px;
          font-weight: 600;
          color: rgba(41, 51, 78, 0.85);
        }
        .el-dialog__headerbtn {
          top: 0;
          height: 45px;
          width: 45px;
          &:hover {
            .el-dialog__close {
              color: #567aff;
            }
          }
        }
      }
      .el-dialog__body {
        padding: 35px 44px 60px 44px;
        .content {
          display: flex;
          justify-content: space-between;
          .item {
            width: 160px;
            height: 160px;
            background: #ffffff;
            border-radius: 2px;
            border: 1px solid #d6dde7;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 32px;
            box-sizing: border-box;
            position: relative;
            cursor: pointer;
            &.disabled {
              background: #f7f9fc;
              cursor: not-allowed;
              .title {
                opacity: 0.6;
              }
              .base-image {
                opacity: 0.6;
              }
              .recently-used {
                opacity: 0.6;
              }
            }
            .title {
              margin-top: 28px;
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(41, 52, 78, 0.85);
            }
            .recently-used {
              position: absolute;
              height: 20px;
              background: #eef2fe;
              border-radius: 2px;
              border: 1px solid #bbcaff;
              padding: 0 8px;
              position: absolute;
              left: 0;
              top: 0;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #567aff;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-popper.is-light {
  background: #ffffff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  border: none;
  .el-popper__arrow::before {
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
    border: none;
  }
}
</style>
