export interface listCategoryModel {
  categoryName: string;
  id: number;
  productNum: number;
}

export interface ProductListModel {
  categoryId: string;
  pageRequest: PageRequest;
  pdName: string;
  pdState: string | boolean;
}
interface PageRequest {
  pageNo: number;
  pageSize: number;
}

export interface ProductListRes {
  current: number;
  records: UndefinedRecord[];
  size: number;
  startRowNo: number;
  total: number;
  totalPage: number;
}
interface UndefinedRecord {
  categoryName: string;
  createTime: string;
  createUser: string;
  id: number;
  pdDesc: string;
  pdName: string;
  pdProvider: string;
  pdState: boolean;
  updateTime: string;
}

export interface ProductDetailRes {
  categoryName: string;
  createTime: string;
  createUser: string;
  effect: string;
  id: number;
  pdDesc: string;
  pdImage: string;
  pdName: string;
  pdProvider: string;
  pdState: boolean;
  pdUrl: string;
}

export interface AddProductModel {
  categoryId: number;
  effect: string;
  id?: string;
  pdDesc: string;
  pdImage: string;
  pdName: string;
  pdProvider: string;
  pdUrl: string;
}
