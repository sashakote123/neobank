const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@images": path.resolve(__dirname, "src/sources/images"),
      "@": path.resolve(__dirname),
    },
  },
};

// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
