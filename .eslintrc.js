const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ["airbnb-typescript", "react-app", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", prettierOptions],
  },
  ignorePatterns: [
    ".eslintrc.js",
    "tailwind.config.js"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
  },
};
