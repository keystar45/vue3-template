import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { Request } from "@/model/common";
import { RootObject } from "@/model/common";
import { RepCodeType } from "@/enum/common";
import { useUserStore } from "@/store";
import Router from "@/router";
const store = useUserStore();

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_DEFAULT, // API 请求的默认前缀，可根据环境变量自行配置
  timeout: 60000, // 请求超时时间
  // url,
  // method,
  // params,
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 登录过期错误处理
        break;
      case 500:
        // 服务器错误处理
        break;
      default:
        ElMessage.error(`${error}`);
    }
  }
  return Promise.reject(error);
};

// 前置拦截器（发起请求之前的拦截）
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // console.log(config, "请求拦截");
  return config;
}, errorHandler);

// 后置拦截器（获取到响应时的拦截）
request.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     */
    // console.log(response.data, "响应拦截");
    if (response.data.code === RepCodeType.success) {
      return response.data;
    } else {
      console.log(
        response.data.code,
        response.data.code === RepCodeType.unauthorized
      );
      switch (response.data.code) {
        case RepCodeType.unauthorized:
          console.log(Router);
          Router.replace("/login");
          return;
        default:
          ElMessage.error(response.data.msg);
      }
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // 处理未授权错误
        ElMessage.error("未授权，请重新登录");
      } else if (status === 403) {
        // 处理禁止访问错误
        ElMessage.error("禁止访问");
      } else if (status === 404) {
        // 处理未找到资源错误
        ElMessage.error("未找到资源");
      } else if (status >= 500) {
        // 处理服务器错误
        ElMessage.error("服务器错误");
      } else {
        // 处理其他错误
        ElMessage.error(data.message);
      }
    } else {
      // 处理请求超时错误
      ElMessage.error("请求超时，请检查网络");
    }
    return Promise.reject(error);
  }
);

const https = <T, D>(config: Request<T>): Promise<RootObject<D>> => {
  return request.request({
    ...config,
    headers: config.useToken
      ? {
          token: store.token,
          "Content-Type": config?.isBlob
            ? "multipart/form-data"
            : "application/json",
        }
      : {},
  });
};

export default https;
