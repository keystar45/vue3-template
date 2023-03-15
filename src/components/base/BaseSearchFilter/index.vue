<template>
  <div class="base-search-filter">
    <div
      v-for="(item, index) in configs"
      :key="index"
      class="base-search-filter-item"
    >
      <div
        class="base-search-filter-item_title"
        :style="{ width: `${titleWidth}px`, minWidth: `${titleWidth}px` }"
      >
        {{ item.title }}:
      </div>
      <template v-if="item.type === 'select'">
        <el-select
          v-model="searchModelObj[item.valueProp]"
          :placeholder="item.placeholder || '请选择'"
          clearable
          @change="(e) => change(e, item.valueProp)"
          @focus="focus(item.valueProp)"
          :multiple="item.multiple"
          :collapse-tags="true"
          class="base-search-filter-item_select"
          v-loading="item.loading === true"
        >
          <el-option
            v-for="option in (item.selectList as selectListItem[])"
            :key="option.id as (string | number)"
            :label="option.name"
            :value="option.id"
          />
        </el-select>
      </template>
      <template v-else-if="item.type === 'datePicker'">
        <el-date-picker
          v-model="searchModelObj[item.valueProp]"
          :type="item.extra?.datePickerType || 'date'"
          range-separator="~"
          :start-placeholder="item.extra?.startPlaceholder || '开始时间'"
          :end-placeholder="item.extra?.endPlaceholder || '结束时间'"
          :format="item.extra?.format"
          :value-format="item.extra?.valueFormat"
          :default-value="item.extra?.defaultValue"
          :disabled-date="item.extra?.disabledDate"
          v-loading="item.loading === true"
          @change="(e) => change(e, item.valueProp)"
          @focus="focus(item.valueProp)"
          class="base-search-filter-item_date-picker"
        />
      </template>
      <template v-else-if="item.type === 'input'">
        <el-input
          v-model="searchModelObj[item.valueProp]"
          clearable
          :placeholder="item.placeholder || '请输入'"
          class="base-search-filter-item_input"
          v-loading="item.loading === true"
          @change="(e) => change(e, item.valueProp)"
          @focus="focus(item.valueProp)"
        />
      </template>
      <template v-else-if="item.type === 'switch'">
        <el-switch
          v-model="searchModelObj[item.valueProp]"
          :active-text="item.selectList && (item.selectList as selectListItem[]).length > 1 ? (item.selectList as selectListItem[])[1].name  : ''"
          :active-value="item.selectList && (item.selectList as selectListItem[]).length > 1 ? (item.selectList as selectListItem[])[1].id  : true"
          :inactive-text="item.selectList && (item.selectList as selectListItem[]).length > 0 ? (item.selectList as selectListItem[])[0].name  : ''"
          :inactive-value="item.selectList && (item.selectList as selectListItem[]).length > 0 ? (item.selectList as selectListItem[])[0].id  : false"
          v-loading="item.loading === true"
          @change="(e) => change(e, item.valueProp)"
          @focus="focus(item.valueProp)"
          class="base-search-filter-item_switch"
        />
      </template>
    </div>
    <div class="base-search-filter-btns" v-if="showBtns">
      <BaseButton type="primary" @click="search">{{
        t("button.query")
      }}</BaseButton>
      <BaseButton type="" @click="reset">重置</BaseButton>
      <BaseButton
        :type="btn.type"
        :loading="!!btn.loading"
        @click="
          () => {
            btn.click && btn.click();
          }
        "
        v-for="btn in extraBtns"
        :key="btn.title"
        >{{ btn.title }}</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTextWidth } from "@/utils/style";
import { computed, PropType } from "vue";
import { configItem, selectListItem } from "./type";

const props = defineProps({
  configs: {
    type: Array as PropType<configItem[]>,
    default: () => [],
  },
  searchModelObj: {
    type: Object,
    default: () => {
      return {};
    },
  },
  showBtns: {
    type: Boolean,
    default: true,
  },
  extraBtns: {
    type: Array as PropType<
      {
        title: string;
        type: string;
        click: () => void;
        loading?: boolean;
      }[]
    >,
    default: () => [],
  },
});

const emit = defineEmits(["searchAction", "resetAction", "change", "focus"]);

const titleWidth = computed(() =>
  props.configs
    .map((ele) => getTextWidth(`${ele.title}:`))
    .reduce(
      (accumulator, currentValue) =>
        currentValue > accumulator ? currentValue : accumulator,
      0
    )
);

function search() {
  if (props.searchModelObj && props.searchModelObj.pageNo) {
    props.searchModelObj.pageNo = 1;
  }
  emit("searchAction");
}

function reset() {
  Object.keys(props.searchModelObj).forEach((key) => {
    switch (key) {
      case "pageSize":
        props.searchModelObj[key] = 10;
        break;
      case "pageNo":
        props.searchModelObj[key] = 1;
        break;
      case "total":
        props.searchModelObj[key] = 0;
        break;
      default:
        {
          const config = props.configs.find((ele) => ele.valueProp === key);
          if (config) {
            if (config.type === "select" && config.multiple) {
              props.searchModelObj[key] = [];
            } else {
              props.searchModelObj[key] = "";
            }
          }
        }
        break;
    }
  });
  emit("resetAction");
}

const change = (e: any, r: any) => {
  emit("change", e, r);
};

const focus = (e: any) => {
  emit("focus", e);
};
</script>

<style lang="scss" scoped>
.base-search-filter {
  &-item {
    display: inline-flex;
    align-items: center;
    margin-right: $spacing-l;
    margin-bottom: $spacing-l;
    &_title {
      @include color("title");
      font-size: $font-size-m;
      padding-right: $spacing-s;
      text-align: left;
    }
    &_select {
      width: 160px;
    }
    &_input {
      width: 160px;
    }
    &_date-picker {
      width: 280px;
      color: red;
    }
  }
  &-btns {
    display: inline-flex;
    font-size: 0;
    margin-bottom: $spacing-l;
  }
}
.hhh {
  width: 280px;
  color: red;
}
</style>
