export interface DataCategoryRes {
  categoryName: string;
  id: number | string;
  productNum: number | string;
}

export interface ListModel {
  categoryIds: any[];
  pageRequest: PageRequest;
}
interface PageRequest {
  pageNo: number;
  pageSize: number;
}
export interface ListRes {
  current: number;
  records: UndefinedRecord[];
  size: number;
  startRowNo: number;
  total: number;
  totalPage: number;
}
export interface UndefinedRecord {
  id: string;
  pdImage: string;
  pdName: string;
  pdProvider: string;
}

export interface DetailRes {
  categoryName: string;
  createTime: string;
  createUser: string;
  effect: string;
  id: string;
  pdDesc: string;
  pdImage: string;
  pdName: string;
  pdProvider: string;
  pdState: boolean;
  pdUrl: string;
}
