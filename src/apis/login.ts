import https from "@/utils/request";
import { RootObject } from "@/model/common";

export const loginRequest = (req: { userName: string; password: string }) => {
  return https<string, { userName: string; password: string }>({
    url: "/market/user/login",
    method: "post",
    data: req,
  });
};
