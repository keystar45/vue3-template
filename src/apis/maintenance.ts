import https from "@/utils/request";
import {
  listCategoryModel,
  ProductListModel,
  ProductListRes,
} from "@/model/maintenance";

export const ListCategory = () => {
  return https<undefined, listCategoryModel[]>({
    url: "/market/ops/listCategory",
    method: "get",
    data: undefined,
    useToken: true,
  });
};

export const ProductList = (req: ProductListModel) => {
  return https<ProductListModel, ProductListRes>({
    url: "/market/ops/productList",
    method: "post",
    data: req,
    useToken: true,
  });
};

export const Putaway = (req: { id: string }) => {
  return https<{ id: string }, undefined>({
    url: "/market/ops/putaway",
    method: "post",
    data: req,
    useToken: true,
  });
};

export const TakeDown = (req: { id: string }) => {
  return https<{ id: string }, undefined>({
    url: "/market/ops/takeDown",
    method: "post",
    data: req,
    useToken: true,
  });
};

export const Remove = (req: { id: string }) => {
  return https<{ id: string }, undefined>({
    url: "/market/ops/remove",
    method: "post",
    data: req,
    useToken: true,
  });
};
