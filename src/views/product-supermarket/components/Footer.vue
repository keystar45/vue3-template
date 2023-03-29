<template>
  <footer>
    <div class="content">
      <BaseImg src="productSupermarket/logo.png" width="auto" :height="48" />
      <div class="flex">
        <div class="left flex">
          <div>宁波供电公司</div>
          <div></div>
          <div>数据统计来源于浙电云等系统</div>
          <div>支持 Chrome 浏览器</div>
        </div>
        <div class="right flex">
          <div>友情链接</div>
          <div @click="goDetail">浙电云数据中台</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const goDetail = () => {
  window.open("http://yyfw.zpepc.com.cn/homePage");
};
</script>

<style lang="scss" scoped>
footer {
  height: 100px;
  background: #0a3b6a;
  .content {
    width: 70%;
    margin: $spacing-m auto 0;
    .left {
      font-size: $font-size-m;
      color: rgba(255, 255, 255, 0.65);
      div {
        margin-right: $spacing-xl;
        &:nth-child(2) {
          height: $height-s;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }
    .right {
      margin-left: 25%;
      font-size: $font-size-m;
      color: #fff;
      div:last-child {
        color: rgba(255, 255, 255, 0.65);
        margin-left: $spacing-xl;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
