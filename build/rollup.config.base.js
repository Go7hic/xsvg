import commonjs from '@rollup/plugin-commonjs'; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import { babel } from '@rollup/plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss';
// 处理css定义的变量
// import simplevars from 'postcss-simple-vars';
// 处理less嵌套样式写法
import nested from 'postcss-nested';
// 替代cssnext
// import postcssPresetEnv from 'postcss-preset-env';
// css代码压缩
import cssnano from 'cssnano';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const pkg = require('../package.json');

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      name: pkg.name,
      file: 'dist/index.umd.js',
      globals: {
        antd: 'antd',
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
    {
      format: 'es',
      name: pkg.name,
      file: 'dist/index.js',
      globals: {
        antd: 'antd',
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
  ],
  external: ['antd', 'react', 'react-dom'],
  onwarn: function (warning) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    console.error(`(!) ${warning.message}`);
  },
  plugins: [
    typescript({
      include: ['*.ts+(|x)', '**/*.ts+(|x)'],
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', 'tsx'],
    }),
    nodeResolve({
      mainFields: ['jsnext:main', 'browser', 'module', 'main'],
      browser: true,
    }),
    postcss({
      plugins: [
        // simplevars(),
        nested(),
        // cssnext({ warnForDuplicates: false, }),
        // postcssPresetEnv(),
        cssnano(),
      ],
      // 处理.css和.less文件
      extensions: ['.css', '.less'],
    }),
    commonjs(),
    json(),
    sourceMaps(),
    isProd &&
      terser({
        output: { comments: false },
        compress: {
          keep_infinity: true,
          pure_getters: true,
          passes: 10,
        },
        ecma: 5,
        warnings: true,
      }),
  ],
};
