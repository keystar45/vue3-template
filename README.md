安装 cyber-login

```shell
# 配置npm 私服
nrm add DCnpm http://172.18.1.186:4873/
# 切换nrm至内网
nrm use DCnpm

npm i cyber-login
```

使用时引入

```shell
import CyberLogin from "cyber-login"
import "cyber-login/style.css";
```

| **属性名**        | **说明**         | **默认值**                                                            | **默认值**                                             |
| ----------------- | ---------------- | --------------------------------------------------------------------- | ------------------------------------------------------ |
| productKey        | 产品名           | "CyberData" &#124; "CyberEngine" &#124; "CyberAI" &#124; "UserCenter" | UserCenter                                             |
| useLocale         | 是否使用国际化   | boolean                                                               | true                                                   |
| baseUrl           | 接口请求 baseUrl | string                                                                | [http://172.18.1.146:30201](http://172.18.1.146:30201) |
| locale            | 语言             | "zh-CN" &#124; "en-US"                                                | zh-CN                                                  |
| title？           | 展示标题         | string                                                                | -                                                      |
| logo？            | logo             | string                                                                | 原型 logo                                              |
| showLogo？        | 是否展示 logo    | boolean                                                               | true                                                   |
| autoLogin？       | 是否自动登录     | boolean                                                               | false                                                  |
| autoLoginLoading? | 自动登录 loading | boolean                                                               | false                                                  |

| **事件名**     | **说明**     | **回调参数**           |
| -------------- | ------------ | ---------------------- |
| loginSuccess   | 登录成功回调 | loginres               |
| updateLanguage | 切换国际化   | locale（props.locale） |

```
type loginres {
  title: string; 产品名
  jwtToken: string; token
  loginName: string; 用户名
  password: string; 密码（未加密）
}
```
