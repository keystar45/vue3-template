<template>
  <div class="maintenance">
    <header>
      <div class="title flex">
        <BaseSvg icon="icon-ningbodianlishujudizuologo" />
        <div>产品超市运维</div>
      </div>
      <el-dropdown :hide-on-click="false">
        <div class="drop-link">
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
          <div class="user-name">{{ userName }}</div>
          <BaseSvg icon="icon-jiantou-xia" />
        </div>
        <template #dropdown>
          <el-dropdown-menu popper-class="title-menu">
            <el-dropdown-item @click="updatePwd"> 修改密码 </el-dropdown-item>
            <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
    <List />
    <UpdatePwd :visible="updateVisable" @close="closeUpdate" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import List from "./components/List.vue";
import UpdatePwd from "./components/UpdatePwd.vue";
import { useUserStore } from "@/store";

const store = useUserStore();

console.log(store);

const Router = useRouter();

const userName = computed(() => store.userName);

const updateVisable = ref(false);

const logout = () => {
  Router.replace("/login");
};

const updatePwd = () => {
  updateVisable.value = true;
};

const closeUpdate = () => {
  updateVisable.value = false;
  store.setUserName("111111");
};
</script>

<style lang="scss" scoped>
.maintenance {
  height: 100%;
  background: #eff4fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  header {
    height: 48px;
    border-bottom: 1px solid #d6dde7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-l;
    .title {
      font-size: $font-size-xl;
      line-height: $height-m;
      :deep(.svg) {
        font-size: 22px;
        margin-right: 11px;
        color: #545c71;
      }
    }
    :deep(.el-dropdown) {
      .drop-link {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:focus-visible {
          outline: none;
        }
        .icon {
          margin-right: $spacing-s;
        }
        .user-name {
          font-size: $font-size-m;
          margin-right: $spacing-m;
        }
      }
    }
  }
}
</style>
