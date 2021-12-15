import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    name: 'index',
    file: 'dist/index.js',
    format: 'es',
  },
});

export default config;
