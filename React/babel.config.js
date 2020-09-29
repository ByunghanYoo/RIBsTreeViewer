module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "babel-plugin-styled-components",
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".js",
          ".ios.js",
          ".android.js",
          ".jsx",
          ".ios.jsx",
          ".android.jsx",
          ".ts",
          ".ios.ts",
          ".android.ts",
          ".tsx",
          ".ios.tsx",
          ".android.tsx"
        ]
      }
    ]
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"]
    }
  }
};
