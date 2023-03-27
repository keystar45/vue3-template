import https from "@/utils/request";
import { UserInfo } from "@/model/common";

export const loginRequest = (req: { userName: string; password: string }) => {
  return https<{ userName: string; password: string }, UserInfo>({
    url: "/market/user/login",
    method: "post",
    data: req,
    useToken: false,
  });
};

export const Logout = () => {
  return https<undefined, string>({
    url: "/market/user/logout",
    method: "get",
    data: undefined,
    useToken: true,
  });
};

export const UpdatePwd = (req: { oldPassword: string; password: string }) => {
  return https<{ oldPassword: string; password: string }, undefined>({
    url: "/market/user/updatePwd",
    method: "post",
    data: req,
    useToken: true,
  });
};
