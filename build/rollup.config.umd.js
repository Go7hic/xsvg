import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'main',
    file: 'dist/main.umd.js',
    format: 'umd',
  },
});

export default config;
