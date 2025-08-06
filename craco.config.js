const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@images": path.resolve(__dirname, "src/sources/images"),
      "@": path.resolve(__dirname),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "^@images/(.*)$": "<rootDir>/src/sources/images/$1",
        "^lodash-es$": "lodash",
        "^axios$": require.resolve("axios"),
      },
      testEnvironment: "jsdom",
    },
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(@reduxjs/toolkit|react-redux|@standard-schema)/)",
      "/node_modules/(?!@reduxjs/toolkit).+\\.js$",
      "node_modules/(?!(@reduxjs/toolkit|react-redux|@rtk-query)/)",
    ],
  },
};

// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
