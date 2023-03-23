import https from "@/utils/request";
import { DataCategoryModel } from "@/model/supermarket";

export const DataCategory = () => {
  return https<undefined, DataCategoryModel[]>({
    url: "/market/show/dataCategory",
    method: "get",
    data: undefined,
    useToken: true,
  });
};
