/*
 * @Author: Kim
 * @Date: 2021-04-09 18:34:42
 * @LastEditTime: 2021-04-09 18:47:43
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/.eslintrc.js
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "google", "prettier", "plugin:prettier/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    settings: { version: "detect" },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/react-in-jsx-scope": 0,
        "require-jsdoc": 0,
    },
};
