module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    // '^components$': '<rootDir>/components/index.tsx',
    // '^components(.*)$': '<rootDir>/components/$1',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(tsx)$',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/esm/', '/dist/'],
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: '测试报告',
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx'],
};
