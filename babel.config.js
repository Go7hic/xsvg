// TODO: from boilplate-core
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
        useESModules: true,
      },
    ],
  ],
  ignore: ['node_modules/**'],
};
