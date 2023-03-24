import https from "@/utils/request";
import { DataCategoryRes } from "@/model/supermarket";

export const DataCategory = () => {
  return https<undefined, DataCategoryRes[]>({
    url: "/market/show/dataCategory",
    method: "get",
    data: undefined,
    useToken: false,
  });
};
