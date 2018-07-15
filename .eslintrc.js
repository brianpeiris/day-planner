module.exports = {
  parser: "babel-eslint",
  env: { browser: true, es6: true },
  parserOptions: { sourceType: "module" },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "prefer-const": "error",
    "no-use-before-define": "error",
    "no-var": "error",
    "no-throw-literal": "error",
    // Light console usage is useful but remove debug logs before merging to master.
    "no-console": "off",
    "lines-between-class-members": 2,
  },
  extends: ["prettier", "eslint:recommended"]
};
