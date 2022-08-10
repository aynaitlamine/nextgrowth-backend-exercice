module.exports = {
  env: {
    node: true,
    jest: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
