<!--

//新建
<BaseSvg icon="icon-icon_tianjia_light" @click="add(scope.row)"></BaseSvg>

//编辑
<BaseSvg icon="icon-icon-bianji-light" @click="tableEdit(scope.row)"></BaseSvg>

//删除
<BaseSvg icon="icon-shanchu-dark" @click="tableDelete(scope.row)"></BaseSvg>

//开启
<BaseSvg icon="icon-yunhang-dark" @click="run(scope.row)"></BaseSvg>

//停止
<BaseSvg icon="icon-tingzhiyunhang-dark" @click="stop(scope.row)"></BaseSvg>
//设置
<BaseSvg icon="icon-xiangmuguanli-light"></BaseSvg>

//查看
<BaseSvg icon="icon-chakan-dark" @click="openUserDetail(scope.row)"></BaseSvg>

//DAG
<BaseSvg icon="icon-icon_DAGtu-light" @click="lookDag(scope.row)"></BaseSvg>

//Test
<BaseSvg icon="icon-ceshi-dark" @click="smokeTest(scope.row)"></BaseSvg>

//重跑
<BaseSvg icon="icon-icon-zhongpao-light" @click="rerunClick(scope.row)"></BaseSvg>
 -->

<template>
  <svg
    :class="['svg', colorType, disabled ? 'is-disabled' : '']"
    aria-hidden="true"
    @click="onClick"
  >
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon: string;
    colorType?:
      | "normal"
      | "red"
      | "yellow"
      | "green"
      | "blue"
      | "gray"
      | string;
    disabled?: boolean;
  }>(),
  {
    colorType: "normal",
    disabled: false,
  }
);

const emit = defineEmits(["click"]);
const onClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>

<style lang="scss">
.svg {
  display: inline-flex;
  align-items: center;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  // color: var(--el-button-text-color);
  @include color("text");
  &:not(.is-disabled):hover {
    @include color("blue-6");
  }
  &:not(.is-disabled):active {
    @include color("blue-5");
  }
  &.is-disabled {
    cursor: not-allowed;
    @include color("disabled");
  }
  &.red {
    color: var(--color--red);
    &:not(.is-disabled):hover {
      @include color("red-2");
    }
    &:not(.is-disabled):active {
      @include color("red-2");
    }
  }
  &.green {
    color: var(--color--green);
    &:not(.is-disabled):hover {
      @include color("green-2");
    }
    &:not(.is-disabled):active {
      @include color("green-2");
    }
  }
  &.yellow {
    color: var(--color--yellow);
    &:not(.is-disabled):hover {
      @include color("yellow-2");
    }
    &:not(.is-disabled):active {
      @include color("yellow-2");
    }
  }
  &.blue {
    @include color("blue-6");
    &.is-disabled {
      opacity: 0.4;
    }
  }
  &.gray {
    @include color("gray-1");
  }
}
.el-button {
  &.is-disabled {
    .svg {
      cursor: not-allowed;
    }
  }
}
</style>
