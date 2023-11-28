const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-case-declarations": "off",
    // Disable style rules to let prettier own it
    "object-curly-spacing": "off",
    "comma-dangle": "off",
    "max-len": "off",
    indent: "off",
    "no-mixed-operators": "off",
    "no-console": "off",
    "arrow-parens": "off",
    "generator-star-spacing": "off",
    "space-before-function-paren": "off",
    "jsx-quotes": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
};
