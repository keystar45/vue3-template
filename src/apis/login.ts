import https from "@/utils/request";

export const loginRequest = (req: { userName: string; password: string }) => {
  return https<string, { userName: string; password: string }>({
    url: "/market/user/login",
    method: "post",
    data: req,
    useToken: false,
  });
};

export const Logout = () => {
  return https<string, undefined>({
    url: "/market/user/logout",
    method: "get",
    data: undefined,
    useToken: true,
  });
};
