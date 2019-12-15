module.exports = {
  parser: "babel-eslint",
  env: { browser: true, es6: true },
  parserOptions: { sourceType: "module" },
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": "error",
    "prefer-const": "error",
    "no-use-before-define": "error",
    "no-var": "error",
    "no-throw-literal": "error",
  },
  extends: ["prettier", "plugin:react/recommended", "eslint:recommended"]
};
