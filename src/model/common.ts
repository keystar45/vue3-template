import { AxiosResponse } from "axios";

export interface RootObject<T> {
  code: string;
  msg: string;
  data: T;
}

export interface Request<T> {
  url: string;
  method: string;
  data: T;
  useToken?: boolean;
}
