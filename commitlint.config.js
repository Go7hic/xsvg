module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建系统/工具更改
        'ci', // 持续集成配置/脚本更改
        'chore', // 构建过程或辅助工具的变动
        'docs', // 文档更改
        'feat', // 新功能、特性
        'fix', // bug修复
        'merge', // Merge branch
        'perf', // 性能优化
        'refactor', // 代码重构
        'revert', // 代码回滚
        'style', // 代码风格（不影响代码运行的变动）
        'test', // 测试用例
      ],
    ],
  },
};
