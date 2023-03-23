export enum RepCodeType {
  success = "200", // 成功
  unauthorized = "401", // 未授权
  expired = "402", // token过期
  forbidden = "403", // 禁止访问
  abnormal = "502", // 服务器异常
}
