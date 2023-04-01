module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能（feature）
        "fix", // 修补bug
        "docs", // 文档（documentation）
        "ui", // 针对css方面的改变新增的类型
        "style", // 格式化文档（不影响代码运行的变动）
        "", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "test", // 增加测试
        "revert", // 回滚
        "perf", // 性能提升
        "chore", // 构建过程或辅助工具的变动
        "api", // 添加或者修改接口
      ],
    ],
    "header-max-length": [1, "always", 72], // header 最大长度超过72个字符以警告提示
    "type-case": [2, "always", "lower-case"], // type需小写
    "type-empty": [2, "always"], // type不能为空
    "subject-empty": [0],
    "subject-case": [0], // subject 单词格式
    "subject-full-stop": [0], // subject不以'.'结尾
    "scope-empty": [0],
    "scope-case": [0],
  },
};
