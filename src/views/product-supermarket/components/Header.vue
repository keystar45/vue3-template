<template>
  <header class="header">
    <div class="header-left flex">
      <div class="icon flex">
        <BaseSvg icon="icon-ningbodianlishujudizuologo" />
        <span>数据地图</span>
      </div>
      <div class="menu flex">
        <div
          class="menu-item flex"
          :class="{ 'is-active': menu.isActive }"
          v-for="menu in menuList"
          :key="menu.title"
          @click="goMeta(menu.isActive)"
        >
          <BaseSvg :icon="menu.icon" />
          <span>{{ menu.title }}</span>
        </div>
      </div>
    </div>
    <div class="header-right flex">
      <div class="item flex pointer" @click="goDataApply">
        <div class="icon">
          <BaseSvg icon="icon-shujushenqing" />
        </div>
        申请流程
      </div>
      <el-dropdown popper-class="cpcs-popper" trigger="hover">
        <div class="item flex pointer">
          <div class="icon">
            <BaseSvg icon="icon-jinruxitong" />
          </div>
          进入系统
          <BaseSvg icon="icon-jiantou-xia" colorType="below" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goMetaLogin">管理员登录</el-dropdown-item>
            <el-dropdown-item @click="goMaintenance"
              >产品超市运维</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { MetaUrl } from "@/apis/supermarket";
const Router = useRouter();

const menuList = [
  {
    icon: "icon-shujuzichan-daohang",
    title: "数据资源",
    isActive: false,
  },
  {
    icon: "icon-xiangmupeizhi-daohang",
    title: "产品超市",
    isActive: true,
  },
];

const url = ref("");

const getMetaUrl = () => {
  MetaUrl().then((res) => {
    url.value = res.data;
  });
};

const goMeta = (e: boolean) => {
  if (e) return;
  location.href = `${url.value}/#/dataDirectory/list`;
};

const goDataApply = () => {
  window.open("http://10.148.222.57/mobile/ToOaSystem.jsp");
};

const goMetaLogin = () => {
  window.open(`${url.value}/#/login`);
};

const goMaintenance = () => {
  const href = Router.resolve({
    path: "/maintenance",
  });
  window.open(href.href, "_blank");
};

onMounted(() => {
  getMetaUrl();
});
</script>

<style lang="scss" scoped>
.header {
  height: 48px;
  border-bottom: 1px solid #d6dde7;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0a3b6a;
  &-left {
    .icon {
      color: #fff;
      font-size: $font-size-xl;
      line-height: $height-m;
      margin-right: 50px;
      :deep(.svg) {
        color: #fff;
        font-size: 24px;
        margin-right: $spacing-s;
      }
    }
    .menu {
      &-item {
        width: 86px;
        height: 28px;
        justify-content: center;
        margin-right: $spacing-l;
        color: #fff;
        cursor: pointer;
        :deep(.svg) {
          margin-right: 5px;
          color: #fff;
        }
      }
      .is-active {
        background: $light-blue;
        border-radius: 2px;
        cursor: default;
        :deep(.svg) {
          cursor: default;
        }
      }
    }
  }
  &-right {
    .item {
      color: #fff;
      .icon {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: $spacing-s;
        :deep(.svg) {
          color: #545c71;
        }
      }
      :deep(.below) {
        margin-right: 0;
        margin-left: 4px;
        color: #fff;
      }
    }
    .pointer {
      cursor: pointer;
    }
    :deep(.el-dropdown) {
      margin-left: $spacing-xl;
      div {
        outline: none;
      }
    }
    :deep(.el-dropdown:focus-visible) {
      box-shadow: none;
      border: none;
      outline: none;
    }
  }
}
</style>

<style lang="scss">
.cpcs-popper {
  .el-dropdown-menu__item {
    display: block;
    text-align: center;
    &:hover {
      background: rgba(41, 51, 78, 0.06);
    }
  }
}
</style>
