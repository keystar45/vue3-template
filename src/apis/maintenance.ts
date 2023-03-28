import https from "@/utils/request";
import {
  listCategoryModel,
  ProductListModel,
  ProductListRes,
  ProductDetailRes,
  AddProductModel,
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

export const ProductDetail = (req: { id: string }) => {
  return https<{ id: string }, ProductDetailRes>({
    url: "/market/ops/productDetail",
    method: "post",
    data: req,
    useToken: true,
  });
};

export const UploadImg = (req: { file: Blob }) => {
  return https<{ file: Blob }, string>({
    url: "/market/ops/uploadImage",
    method: "post",
    data: req,
    useToken: true,
    isBlob: true,
  });
};

export const AddProduct = (req: AddProductModel) => {
  return https<AddProductModel, string>({
    url: "/market/ops/addProduct",
    method: "post",
    data: req,
    useToken: true,
  });
};

export const EditProduct = (req: AddProductModel) => {
  return https<AddProductModel, string>({
    url: "/market/ops/editProduct",
    method: "post",
    data: req,
    useToken: true,
  });
};
