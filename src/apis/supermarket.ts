import https from "@/utils/request";
import {
  DataCategoryRes,
  ListModel,
  ListRes,
  DetailRes,
} from "@/model/supermarket";

export const DataCategory = () => {
  return https<undefined, DataCategoryRes[]>({
    url: "/market/show/dataCategory",
    method: "get",
    data: undefined,
    useToken: false,
  });
};

export const List = (req: ListModel) => {
  return https<ListModel, ListRes>({
    url: "/market/show/list",
    method: "post",
    data: req,
    useToken: false,
  });
};

export const Detail = (req: { id: string }) => {
  return https<{ id: string }, DetailRes>({
    url: "/market/show/detail",
    method: "post",
    data: req,
    useToken: false,
  });
};

export const MetaUrl = () => {
  return https<undefined, string>({
    url: "/market/show/getMetaUrl",
    method: "get",
    data: undefined,
    useToken: false,
  });
};
