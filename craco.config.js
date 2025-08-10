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
        "^.+\\.module\\.(css|less|sass|scss)$": "identity-obj-proxy",
      },
      testEnvironment: "jsdom",
    },
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: [
      "/node_modules",
      // "/node_modules/(?!(@reduxjs/toolkit|react-redux|@standard-schema)/)",
    ],
  },
  // babel: {
  //   presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
  //   plugins: ["@babel/plugin-proposal-class-properties"],
  // },
};

// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
