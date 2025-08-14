const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@images': path.resolve(__dirname, 'src/sources/images'),
      '@': path.resolve(__dirname),
    },
  },
  jest: {
    moduleDirectories: ['node_modules', 'src'],
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@images/(.*)$': '<rootDir>/src/sources/images/$1',
        '^lodash-es$': 'lodash',
        '^.+\\.module\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      },
      testEnvironment: 'jsdom',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.ts'],
    transformIgnorePatterns: ['/node_modules'],
  },
};

// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
