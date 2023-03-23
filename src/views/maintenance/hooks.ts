import { ref, reactive, onMounted } from "vue";
import { configItem } from "@/components/base/BaseSearchFilter/type";
import { columnItem } from "@/components/base/BaseTable/type";
import { ListCategory, ProductList } from "@/apis/maintenance";

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
      selectList: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 0,
          name: "待上架",
        },
        {
          id: 1,
          name: "已上架",
        },
      ] as {
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

  const tableData = ref<any[]>([]);

  const configs = ref<columnItem[]>([
    {
      label: "产品名称",
      prop: "pdName",
    },
    {
      label: "专题库",
      prop: "categoryName",
    },
    {
      label: "产品提供方",
      prop: "pdProvider",
    },
    {
      label: "产品描述",
      prop: "pdDesc",
    },
    {
      label: "状态",
      prop: "pdState",
      slotName: "pdState",
    },
    {
      label: "创建人",
      prop: "createUser",
    },
    {
      label: "创建时间",
      prop: "createTime",
    },
    {
      label: "更新时间",
      prop: "updateTime",
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
    "": "全部",
    false: "待上架",
    true: "已上架",
  };

  const getListCategory = () => {
    ListCategory().then((res) => {
      console.log(res);
      filterConfigs[1].selectList = res.data.map((el) => {
        return {
          id: el.id,
          name: el.categoryName,
        };
      });
    });
  };

  const getTableList = () => {
    ProductList({
      categoryId: searchModelObj.db,
      pageRequest: {
        pageNo: pageInfo.pageNo,
        pageSize: pageInfo.pageSize,
      },
      pdName: searchModelObj.name,
      pdState: searchModelObj.state,
    }).then((res) => {
      tableData.value = res.data.records;
      pageInfo.total = Number(res.data.total);
    });
  };

  const initPageInfo = () => {
    pageInfo.pageNo = 1;
    pageInfo.pageSize = 10;
  };

  const searchAction = () => {
    initPageInfo();
    getTableList();
  };
  const resetAction = () => {
    initPageInfo();
    getTableList();
  };

  const pageChange = () => {
    getTableList();
  };

  onMounted(() => {
    getListCategory();
    getTableList();
  });

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
    getTableList,
  };
};
