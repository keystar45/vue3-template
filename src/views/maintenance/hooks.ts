import { ref, reactive } from "vue";
import { configItem } from "@/components/base/BaseSearchFilter/type";
import { columnItem } from "@/components/base/BaseTable/type";

export const useTableData = () => {
  const filterConfigs = reactive<configItem[]>([
    {
      type: "input",
      valueProp: "name",
      title: "产品名称",
      placeholder: "请输入",
    },
    {
      type: "select",
      valueProp: "db",
      title: "专题库",
      placeholder: "请选择",
      selectList: [] as {
        id: number;
        name: string;
      }[],
    },
    {
      type: "select",
      valueProp: "state",
      title: "状态",
      placeholder: "请选择",
      selectList: [] as {
        id: number;
        name: string;
      }[],
    },
  ]);

  const searchModelObj = reactive({
    name: "",
    db: "",
    state: "",
  });

  const tableData = ref<any[]>([
    {
      name: "11111",
      state: 1,
    },
  ]);

  const configs = ref<columnItem[]>([
    {
      label: "产品名称",
      prop: "name",
    },
    {
      label: "专题库",
      prop: "name",
    },
    {
      label: "产品提供方",
      prop: "name",
    },
    {
      label: "产品描述",
      prop: "name",
    },
    {
      label: "状态",
      prop: "state",
      slotName: "state",
    },
    {
      label: "创建人",
      prop: "name",
    },
    {
      label: "创建时间",
      prop: "name",
    },
    {
      label: "更新时间",
      prop: "name",
    },
    {
      label: "操作",
      prop: "operate",
      slotName: "operate",
      fixed: "right",
      width: "140",
    },
  ]);

  const pageInfo = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 10,
  });

  const stateEnum = {
    1: "已上架",
    2: "待上架",
  };

  const initPageInfo = () => {
    pageInfo.pageNo = 1;
    pageInfo.pageSize = 10;
  };

  const searchAction = () => {
    initPageInfo();
  };
  const resetAction = () => {
    initPageInfo();
  };

  const pageChange = () => {};

  return {
    filterConfigs,
    searchModelObj,
    tableData,
    configs,
    pageInfo,
    stateEnum,
    searchAction,
    resetAction,
    pageChange,
  };
};
