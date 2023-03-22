<template>
  <div class="list-item">
    <div class="img-box">
      <img :src="item.img" alt="Base64 Image" />
      <div class="button-box flex">
        <BaseButton type="primary" @click="goDetail(item.id, item.name)"
          >查看详情</BaseButton
        >
      </div>
    </div>
    <div class="title flex">
      <BeyondTooltip width="100%" :content="item.title" />
    </div>
    <div class="department flex">
      <BeyondTooltip width="100%" :content="item.name" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
withDefaults(
  defineProps<{
    item: {
      id: string;
      title: string;
      name: string;
      img: string;
    };
  }>(),
  {
    item: () => {
      return {
        id: "1",
        title: "111",
        name: "2222222",
        img: "",
      };
    },
  }
);

const Router = useRouter();

const emit = defineEmits(["detail"]);

const goDetail = (id: string, name: string) => {
  emit("detail", { id, name });
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 240px;
  height: 200px;
  box-shadow: 0px 5px 10px 0px rgba(86, 122, 255, 0.1);
  border-radius: 2px;
  border: 1px solid #567aff;
  margin-right: $spacing-l;
  margin-bottom: $spacing-l;
  .img-box {
    height: 135px;
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    .button-box {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: none;
      background: rgba(41, 52, 78, 0.8);
    }
    &:hover {
      .button-box {
        display: flex;
        justify-content: center;
      }
    }
  }
  .title {
    padding: 0 10px;
    font-size: $font-size-l;
    color: #29344e;
    height: $height-xxxl;
  }
  .department {
    padding: 0 10px;
    font-size: $font-size-m;
    color: rgba(41, 52, 78, 0.65);
    height: 17px;
  }
}
</style>
