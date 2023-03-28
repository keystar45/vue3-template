<template>
  <div class="sort flex">
    <div class="title">数据目录列表</div>
    <div
      class="sort-item"
      :class="{ 'check-item': sortType === 1 }"
      style="cursor: pointer"
      @click="sortChange(1)"
    >
      综合排序
    </div>
    <div
      class="sort-item flex"
      :class="{ 'check-item': sortType === 2 || sortType === 3 }"
    >
      <span @click="sortChange(view[sortType])">浏览次数</span>
      <div class="icon">
        <BaseSvg
          icon="icon-sanjiaojiantoushang"
          :colorType="{ 'check-icon': sortType === 2 }"
          @click="sortChange(2)"
        />
        <BaseSvg
          icon="icon-sanjiaojiantouxia"
          :colorType="{ 'check-icon': sortType === 3 }"
          @click="sortChange(3)"
        />
      </div>
    </div>
    <div
      class="sort-item flex"
      :class="{ 'check-item': sortType === 4 || sortType === 5 }"
    >
      <span @click="sortChange(fav[sortType])">收藏次数</span>
      <div class="icon">
        <BaseSvg
          icon="icon-sanjiaojiantoushang"
          :colorType="{ 'check-icon': sortType === 4 }"
          @click="sortChange(4)"
        />
        <BaseSvg
          icon="icon-sanjiaojiantouxia"
          :colorType="{ 'check-icon': sortType === 5 }"
          @click="sortChange(5)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["sort"]);
const sortType = ref(1);

const view = {
  1: 3,
  2: 3,
  3: 2,
  4: 3,
  5: 3,
};

const fav = {
  1: 5,
  2: 5,
  3: 5,
  4: 5,
  5: 4,
};

const sortChange = (type: number) => {
  sortType.value = type;
  emit("sort", type);
};
</script>

<style lang="scss" scoped>
.sort {
  color: rgba(41, 51, 78, 0.65);
  .title {
    margin-right: 60px;
    @include color("title");
  }
  &-item {
    display: flex;
    margin-right: 32px;
    span {
      cursor: pointer;
    }
  }
  .icon {
    margin-left: 6px;
    :deep(.svg) {
      display: block;
      color: #a9aeb8;
      transform: scale(0.7);
      &:first-child {
        margin-bottom: -4px;
      }
      &:last-child {
        margin-top: -4px;
      }
    }
  }
  .check-item {
    @include color("blue");
    :deep(.check-icon) {
      @include color("blue");
    }
  }
}
</style>
