<template>
  <div id="user-drop" :class="props.theme">
    <el-dropdown :hide-on-click="false">
      <span class="drop-link">
        <svg
          t="1677207550331"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="26092"
          width="24"
          height="24"
        >
          <path
            d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
            fill="#FFFFFF"
            p-id="26093"
          ></path>
          <path
            d="M384 213.333333m128 0l0 0q128 0 128 128l0 42.666667q0 128-128 128l0 0q-128 0-128-128l0-42.666667q0-128 128-128Z"
            fill="#BEC1C9"
            p-id="26094"
          ></path>
          <path
            d="M256 554.666667m106.666667 0l298.666666 0q106.666667 0 106.666667 106.666666l0 0q0 106.666667-106.666667 106.666667l-298.666666 0q-106.666667 0-106.666667-106.666667l0 0q0-106.666667 106.666667-106.666666Z"
            fill="#545C71"
            p-id="26095"
          ></path>
        </svg>
        <div class="user-name">{{ uname }}</div>
        <el-icon class="user-name-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu popper-class="title-menu">
          <el-dropdown-item @click="onLogout()"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  theme: {
    type: String,
    default: "",
  },
});

const router = useRouter();

const uname = "未登录";

function onChangeRouter(path: string) {
  router.push(path);
}
//! 登出
function onLogout() {}
</script>

<style lang="scss">
#user-drop {
  margin-right: $spacing-l;
  .drop-link {
    @include flex;
    cursor: pointer;
    svg {
      margin: 0;
      margin-left: $spacing-s;
    }
    .el-icon {
      svg {
        margin: 0;
      }
    }
    .user-name {
      margin-left: $spacing-s;
      @include text($font-size-m, $height-m, 400);
      @include color("text");
    }
    .user-name-icon--right {
      margin-left: $spacing-xl;
      @include color("text");
    }
    &:hover {
      .user-name {
        @include color("blue");
      }
      .user-name-icon--right {
        @include color("blue");
      }
    }
  }
  &.light {
    .user-name {
      color: white;
    }
    .user-name-icon--right {
      color: white;
    }
    &:hover {
      .user-name {
        @include color("blue");
      }
      .user-name-icon--right {
        @include color("blue");
      }
    }
  }
}
</style>
